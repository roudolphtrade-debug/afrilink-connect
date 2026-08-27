import { useSyncExternalStore } from "react";
import { PROS, MOCK_CONVERSATIONS, type Pro } from "@/lib/mock-data";
import type { Session } from "@/lib/auth-store";

/**
 * Messagerie de démonstration : aucun backend temps réel.
 * Les fils sont persistés en localStorage et partagés entre les comptes
 * (une conversation ouverte depuis un compte apparaît chez son destinataire),
 * ce qui permet de tester le parcours avec deux comptes distincts.
 */

const KEY = "afrilink.threads.v1";

export type ParticipantId = string; // "user:<email>" | "pro:<id>"

export type StoredMessage = {
  id: string;
  from: ParticipantId;
  text: string;
  ts: number;
};

export type Thread = {
  key: string;
  participants: [ParticipantId, ParticipantId];
  messages: StoredMessage[];
  /** Timestamp du dernier message lu, par participant. */
  readAt: Record<ParticipantId, number>;
};

type Store = Record<string, Thread>;

let store: Store | null = null;
let listeners: (() => void)[] = [];

export function slugifyName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.|\.$/g, "");
}

/** Identité de démo : un email correspondant au nom d'un pro « incarne » ce pro. */
export function identityFor(session: Session | null): ParticipantId | null {
  if (!session) return null;
  const local = session.email.split("@")[0]!.toLowerCase();
  const match = PROS.find(
    (p) => p.kind === "person" && (slugifyName(p.name) === local || slugifyName(p.name).replace(/\./g, "") === local.replace(/[._-]/g, "")),
  );
  if (match) return `pro:${match.id}`;
  return `user:${session.email.toLowerCase()}`;
}

export function threadKey(a: ParticipantId, b: ParticipantId) {
  return [a, b].sort().join("|");
}

export function proOf(id: ParticipantId): Pro | null {
  if (!id.startsWith("pro:")) return null;
  return PROS.find((p) => p.id === id.slice(4)) ?? null;
}

export function displayNameOf(id: ParticipantId): string {
  const pro = proOf(id);
  if (pro) return pro.name;
  const local = id.slice(5).split("@")[0] ?? "Membre";
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase() + w.slice(1))
    .join(" ");
}

export function initialsOf(id: ParticipantId): string {
  const pro = proOf(id);
  if (pro) return pro.initials;
  return (
    displayNameOf(id)
      .split(/\s+/)
      .map((w) => w[0]!.toUpperCase())
      .slice(0, 2)
      .join("") || "AL"
  );
}

function read(): Store {
  if (store) return store;
  if (typeof window === "undefined") return {};
  let parsed: Store = {};
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) parsed = JSON.parse(raw) as Store;
  } catch {
    parsed = {};
  }
  store = parsed;
  return store;
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(store ?? {}));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.push(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      store = null;
      cb();
    }
  };
  if (typeof window !== "undefined") window.addEventListener("storage", onStorage);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
    if (typeof window !== "undefined") window.removeEventListener("storage", onStorage);
  };
}

/* ---------- Amorçage des conversations de démonstration ---------- */

const DAY = 86_400_000;

function seedFor(me: ParticipantId): Store {
  const seeded: Store = {};
  MOCK_CONVERSATIONS.forEach((c, ci) => {
    const other: ParticipantId = `pro:${c.proId}`;
    if (other === me) return;
    const key = threadKey(me, other);
    const base = Date.now() - (ci + 1) * DAY;
    const messages: StoredMessage[] = c.messages.map((m, i) => ({
      id: `${c.id}-${i}`,
      from: m.from === "me" ? me : other,
      text: m.text,
      ts: base + i * 4 * 60_000,
    }));
    const lastMine = [...messages].reverse().find((m) => m.from === me);
    seeded[key] = {
      key,
      participants: [me, other],
      messages,
      readAt: { [me]: c.unread > 0 ? (lastMine?.ts ?? 0) : Date.now() },
    };
  });
  return seeded;
}

/** Amorce une seule fois les fils de démo pour l'identité courante. */
export function ensureSeed(me: ParticipantId | null) {
  if (!me || typeof window === "undefined") return;
  const s = read();
  const flag = `${KEY}.seeded:${me}`;
  try {
    if (localStorage.getItem(flag)) return;
    localStorage.setItem(flag, "1");
  } catch {
    return;
  }
  const seeded = seedFor(me);
  store = { ...s, ...Object.fromEntries(Object.entries(seeded).filter(([k]) => !s[k])) };
  persist();
}

/* ---------- Lecture ---------- */

export type ConversationView = {
  key: string;
  other: ParticipantId;
  name: string;
  initials: string;
  avatar?: string;
  pro: Pro | null;
  messages: StoredMessage[];
  lastMessage: string;
  lastTs: number;
  unread: number;
};

const EMPTY_STORE: Store = {};

export function useThreads(): Store {
  return useSyncExternalStore(subscribe, read, () => EMPTY_STORE);
}

export function conversationsFor(threads: Store, me: ParticipantId | null): ConversationView[] {
  if (!me) return [];
  return Object.values(threads)
    .filter((t) => t.participants.includes(me))
    .map((t) => {
      const other = t.participants.find((p) => p !== me) ?? me;
      const pro = proOf(other);
      const last = t.messages[t.messages.length - 1];
      const readAt = t.readAt?.[me] ?? 0;
      return {
        key: t.key,
        other,
        name: pro?.name ?? displayNameOf(other),
        initials: pro?.initials ?? initialsOf(other),
        avatar: pro?.avatar,
        pro,
        messages: t.messages,
        lastMessage: last?.text ?? "Nouvelle conversation",
        lastTs: last?.ts ?? 0,
        unread: t.messages.filter((m) => m.from !== me && m.ts > readAt).length,
      };
    })
    .sort((a, b) => b.lastTs - a.lastTs);
}

/* ---------- Écriture ---------- */

export function openThread(me: ParticipantId, other: ParticipantId) {
  const key = threadKey(me, other);
  const s = read();
  if (!s[key]) {
    store = { ...s, [key]: { key, participants: [me, other], messages: [], readAt: { [me]: Date.now() } } };
    persist();
  }
  return key;
}

export function sendMessage(me: ParticipantId, other: ParticipantId, text: string) {
  const clean = text.trim();
  if (!clean) return null;
  const key = openThread(me, other);
  const s = read();
  const t = s[key]!;
  const msg: StoredMessage = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, from: me, text: clean, ts: Date.now() };
  store = { ...s, [key]: { ...t, messages: [...t.messages, msg], readAt: { ...t.readAt, [me]: msg.ts } } };
  persist();
  return key;
}

export function markThreadRead(me: ParticipantId, key: string) {
  const s = read();
  const t = s[key];
  if (!t) return;
  if ((t.readAt?.[me] ?? 0) >= (t.messages[t.messages.length - 1]?.ts ?? 0)) return;
  store = { ...s, [key]: { ...t, readAt: { ...t.readAt, [me]: Date.now() } } };
  persist();
}

export function markAllRead(me: ParticipantId) {
  const s = read();
  const next: Store = { ...s };
  Object.values(s).forEach((t) => {
    if (t.participants.includes(me)) next[t.key] = { ...t, readAt: { ...t.readAt, [me]: Date.now() } };
  });
  store = next;
  persist();
}

export function deleteThread(key: string) {
  const s = read();
  if (!s[key]) return;
  const next = { ...s };
  delete next[key];
  store = next;
  persist();
}

export function resetThreads() {
  store = {};
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(KEY))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
  persist();
}

/* ---------- Formatage ---------- */

export function formatTime(ts: number) {
  const d = new Date(ts);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const yesterday = new Date(now.getTime() - DAY).toDateString() === d.toDateString();
  const hhmm = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  if (sameDay) return hhmm;
  if (yesterday) return `Hier ${hhmm}`;
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }) + " " + hhmm;
}

/** Réponse automatique de démonstration (jamais présentée comme du temps réel). */
export function autoReply(me: ParticipantId, other: ParticipantId) {
  const pro = proOf(other);
  const text = pro
    ? `Merci pour votre message ! Je reviens vers vous très vite.`
    : `Bien reçu, merci !`;
  const key = threadKey(me, other);
  const s = read();
  const t = s[key];
  if (!t) return;
  const msg: StoredMessage = { id: `${Date.now()}-auto`, from: other, text, ts: Date.now() };
  store = { ...s, [key]: { ...t, messages: [...t.messages, msg] } };
  persist();
}
