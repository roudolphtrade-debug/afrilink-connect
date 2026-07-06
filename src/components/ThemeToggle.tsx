import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const THEME_COLOR_LIGHT = "#0F2B1E";
const THEME_COLOR_DARK = "#040c06";

function setThemeColorMeta(dark: boolean) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? THEME_COLOR_DARK : THEME_COLOR_LIGHT);
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    setThemeColorMeta(dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    setThemeColorMeta(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage unavailable (private browsing, etc.) — theme just won't persist
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary/40 ${className}`}
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
}
