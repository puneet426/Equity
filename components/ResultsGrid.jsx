"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Card3D from "./Card3D";

export default function ResultsGrid({ people }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const shown = useMemo(
    () => people.filter((p) => (cat === "all" || p.course === cat) && p.name.toLowerCase().includes(q.trim().toLowerCase())),
    [people, cat, q]
  );
  return (
    <>
      <div className="toolbar">
        <div className="seg" role="group" aria-label="Filter by course">
          {[["all", "All"], ["CA", "CA"], ["CS", "CS"]].map(([k, l]) => (
            <button key={k} type="button" aria-pressed={cat === k} onClick={() => setCat(k)}>
              {cat === k && <motion.i layoutId="seg" className="seg-bg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span>{l}</span>
            </button>
          ))}
        </div>
        <div className="search">
          <label htmlFor="achiever-search" className="sr">Find a name</label>
          <input id="achiever-search" type="search" autoComplete="off" placeholder="Find a name" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <p className="count" aria-live="polite">Showing {shown.length} of {people.length} achievers</p>
      {shown.length ? (
        <motion.ul className="faces" layout>
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.li key={p.slug} layout initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, delay: Math.min(i, 12) * 0.025 }}>
                <Card3D className={`face${p.note ? " face--top" : ""}`} depth={10} tilt={14} scrollTilt={0}>
                  <Image src={`/img/achievers/${p.slug}.webp`} alt={`${p.name}, ${p.course} achiever at Equity Classes`} width={150} height={150} quality={90} priority={i < 8} />
                  <b>{p.name}</b>
                  <span>{p.course}{p.note ? " · State Topper" : ""}</span>
                </Card3D>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="empty">
          <p>No achiever by that name.</p>
          <button className="btn btn--glass" type="button" onClick={() => { setQ(""); setCat("all"); }}>Clear the search</button>
        </div>
      )}
    </>
  );
}
