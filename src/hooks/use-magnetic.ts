import { useRef } from "react";

const MAX_OFFSET = 8;

export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = clamp((e.clientX - (rect.left + rect.width / 2)) * strength, -MAX_OFFSET, MAX_OFFSET);
    const y = clamp((e.clientY - (rect.top + rect.height / 2)) * strength, -MAX_OFFSET, MAX_OFFSET);
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return { ref, onMouseMove, onMouseLeave, style: { transition: "transform 0.2s ease-out" } };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
