"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Stars, Arrow } from "./Icons";

const DUR = 7000;
const ease = [0.16, 1, 0.3, 1];

/* A swipeable deck of 3D review cards. Front card auto-advances; the next two wait behind it. */
export default function Testimonials({ reviews, faces, rating, count, mapLink }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = reviews.length;
  const timer = useRef(0);

  const go = useCallback((d) => { setDir(d); setI((v) => (v + d + n) % n); }, [n]);
  useEffect(() => {
    if (paused || reduce) return;
    timer.current = setTimeout(() => go(1), DUR);
    return () => clearTimeout(timer.current);
  }, [i, paused, reduce, go]);

  const r = reviews[i];
  const behind = [1, 2].map((k) => reviews[(i + k) % n]);

  return (
    <div className="tm">
      <div className="tm-side">
        <a className="tm-score" href={mapLink} target="_blank" rel="noopener">
          <b className="gold-txt">{rating}</b>
          <span className="tm-score-l"><Stars />Rated on Google from {count} reviews</span>
          <em>Read them all<Arrow /></em>
        </a>
        <div className="tm-faces">
          <p>Some of the students behind these results</p>
          <div className="tm-face-row">
            {faces.map((a, k) => (
              <motion.span key={a.slug} className="tm-face" initial={{ opacity: 0, scale: 0.6, y: 10 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: k * 0.06, duration: 0.6, ease }}>
                <Image src={`/img/achievers/${a.slug}.webp`} alt={`${a.name}, ${a.course} achiever`} width={64} height={64} quality={90} />
                <small>{a.name.split(" ")[0]}</small>
              </motion.span>
            ))}
          </div>
          <Link className="link" href="/results">Meet all our achievers</Link>
        </div>
      </div>

      <div className="tm-deck-wrap" onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)} onPointerLeave={() => setPaused(false)}>
        <div className="tm-deck" aria-roledescription="carousel" aria-label="Student reviews">
          {behind.slice().reverse().map((b, k) => (
            <div key={`${b.name}-bg`} className={`tm-ghost tm-ghost--${2 - k}`} aria-hidden="true">
              <p>{b.text}</p>
            </div>
          ))}
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.figure key={r.name} className="tm-card" custom={dir}
              role="group" aria-roledescription="slide" aria-label={`Review ${i + 1} of ${n}`}
              drag={reduce ? false : "x"} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.6}
              onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 400) go(info.offset.x < 0 ? 1 : -1); }}
              variants={{
                enter: (d) => ({ opacity: 0, x: d * 60, rotateY: d * -18, scale: 0.92 }),
                center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
                exit: (d) => ({ opacity: 0, x: d * -260, rotate: d * -8, rotateY: d * 25, scale: 0.9 }),
              }}
              initial="enter" animate="center" exit="exit" transition={{ duration: 0.7, ease }}>
              <span className="tm-quote" aria-hidden="true">&ldquo;</span>
              <Stars />
              <blockquote><p>{r.text}</p></blockquote>
              <figcaption>
                <span className="tm-avatar" aria-hidden="true">{r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                <span><b>{r.name}</b><small>Student, Google review</small></span>
              </figcaption>
              {!reduce && <span className="tm-progress" aria-hidden="true"><motion.i key={`${i}-${paused}`} initial={{ scaleX: 0 }} animate={{ scaleX: paused ? 0 : 1 }} transition={{ duration: paused ? 0.3 : DUR / 1000, ease: "linear" }} /></span>}
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="tm-ctrl">
          <button type="button" className="tm-btn" onClick={() => go(-1)} aria-label="Previous review"><Arrow style={{ transform: "scaleX(-1)" }} /></button>
          <div className="tm-dots" role="tablist" aria-label="Choose a review">
            {reviews.map((x, k) => (
              <button key={x.name} type="button" role="tab" aria-selected={k === i} aria-label={`Review by ${x.name}`}
                className={k === i ? "is-on" : ""} onClick={() => { setDir(k > i ? 1 : -1); setI(k); }}>
                {x.name[0]}
              </button>
            ))}
          </div>
          <button type="button" className="tm-btn" onClick={() => go(1)} aria-label="Next review"><Arrow /></button>
        </div>
        <p className="tm-hint">Swipe the card, or use the arrows</p>
      </div>
    </div>
  );
}
