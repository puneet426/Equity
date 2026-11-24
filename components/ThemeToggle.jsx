"use client";
import { useEffect, useState } from "react";

/* Sun / moon switch. The theme is set before paint by the inline script in layout.jsx. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);
  useEffect(() => setTheme(document.documentElement.dataset.theme || "dark"), []);

  const flip = () => {
    const next = theme === "light" ? "dark" : "light";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#fbf6ff" : "#16011f");
      try { localStorage.setItem("theme", next); } catch {}
      setTheme(next);
    };
    if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) document.startViewTransition(apply);
    else apply();
  };

  const light = theme === "light";
  return (
    <button type="button" className={`theme${light ? " is-light" : ""}`} onClick={flip}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"} title={light ? "Dark theme" : "Light theme"}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <mask id="moon-cut"><rect width="24" height="24" fill="#fff" /><circle className="theme-cut" cx="24" cy="4" r="7" fill="#000" /></mask>
        <circle className="theme-core" cx="12" cy="12" r="5.2" mask="url(#moon-cut)" fill="currentColor" />
        <g className="theme-rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="12" y1="2.2" x2="12" y2="4.2" transform={`rotate(${a} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
}
