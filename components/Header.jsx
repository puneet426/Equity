"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { D, HELLO, wa, tel } from "@/lib/site";
import { WhatsApp, Phone } from "./Icons";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  ["Courses", "/#courses"],
  ["Faculty", "/#faculty"],
  ["Results", "/results"],
  ["Reviews", "/#reviews"],
  ["Contact", "/contact"],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const on = () => setScrolled(scrollY > 24);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [open]);

  return (
    <>
      <header className={`hdr${scrolled ? " is-scrolled" : ""}`}>
        <div className="hdr-in">
          <Link className="brand" href="/" aria-label="Equity Classes, home">
            <Image src="/img/mark.png" alt="" width={34} height={38} priority />
            <b>EQUITY<span>CLASSES</span></b>
          </Link>
          <nav className="hdr-nav" aria-label="Main">
            {LINKS.map(([l, h]) => (
              <Link key={l} href={h} aria-current={path === h ? "page" : undefined}>{l}</Link>
            ))}
          </nav>
          <a className="hdr-call" href={tel}><Phone />{D.PHONE_OFFICE_SHOW}</a>
          <ThemeToggle />
          <a className="btn btn--gold btn--sm hdr-cta" href={wa(HELLO)} target="_blank" rel="noopener"><WhatsApp />WhatsApp us</a>
          <button className={`burger${open ? " is-open" : ""}`} type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
            <span /><span /><b className="sr">{open ? "Close menu" : "Open menu"}</b>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="menu" className="menu" role="dialog" aria-modal="true" aria-label="Menu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }} animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }} transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}>
            <nav aria-label="Mobile">
              {LINKS.map(([l, h], i) => (
                <motion.div key={l} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}>
                  <Link href={h} onClick={() => setOpen(false)}>{l}</Link>
                </motion.div>
              ))}
            </nav>
            <motion.div className="menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <a className="btn btn--gold" href={tel}><Phone />Call {D.PHONE_OFFICE_SHOW}</a>
              <p>{D.ADDRESS_1}, Lalpur<br />{D.HOURS}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
