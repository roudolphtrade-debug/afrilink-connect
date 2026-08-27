import { useSyncExternalStore } from "react";

export type Session = { email: string; name: string; initials: string };

const KEY = "afrilink.session";
let listeners: (() => void)[] = [];
let cached: Session | null = null;
let hydrated = false;

function read(): Session | null {
  if (typeof window === "undefined") return null;
  if (!hydrated) {
    try {
      const raw = localStorage.getItem(KEY);
      cached = raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      cached = null;
    }
    hydrated = true;
  }
  return cached;
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

export function initialsFrom(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("") || "AL";
}

export function signIn(email: string, name?: string) {
  const display = (name?.trim() || email.split("@")[0].replace(/[._-]+/g, " "))
    .split(/\s+/)
    .map((w) => (w ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");
  cached = { email, name: display, initials: initialsFrom(display) };
  hydrated = true;
  try {
    localStorage.setItem(KEY, JSON.stringify(cached));
  } catch {
    /* ignore */
  }
  emit();
}

export function signOut() {
  cached = null;
  hydrated = true;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  emit();
}

export function useSession() {
  return useSyncExternalStore(subscribe, read, () => null);
}
