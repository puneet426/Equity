"use client";
import { motion, useReducedMotion } from "motion/react";
import Book3D from "./Book3D";
import Card3D from "./Card3D";
import { D, TAGLINE, tel, topper } from "@/lib/site";
import { Phone, Arrow, Stars } from "./Icons";

const ease = [0.16, 1, 0.3, 1];

function Dial() {
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const a = (i * 5 * Math.PI) / 180;
    const [r1, r2] = i % 6 ? [188, 198] : [176, 198];
    const f = (n) => (200 + n).toFixed(2);
    return <line key={i} x1={f(r1 * Math.cos(a))} y1={f(r1 * Math.sin(a))} x2={f(r2 * Math.cos(a))} y2={f(r2 * Math.sin(a))} />;
  });
  return (
    <svg className="dial" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="dialg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe2a8" /><stop offset=".5" stopColor="#f9c26a" /><stop offset="1" stopColor="#c9a8ee" />
        </linearGradient>
        <radialGradient id="dialglow"><stop offset=".55" stopColor="#f9c26a" stopOpacity=".22" /><stop offset="1" stopColor="#f9c26a" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="200" cy="200" r="200" fill="url(#dialglow)" />
      <g stroke="url(#dialg)" strokeWidth="1.6" strokeLinecap="round" opacity=".85">{ticks}</g>
      <circle cx="200" cy="200" r="166" fill="none" stroke="url(#dialg)" strokeOpacity=".6" strokeWidth="1.6" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="#c9a8ee" strokeOpacity=".35" strokeWidth="1" strokeDasharray="2 7" />
    </svg>
  );
}

const LINES = [
  [<span key="a">Become a <em className="gold-txt">CA.</em></span>, ""],
  [<span key="b">Or a CS.</span>, "thin"],
  [<span key="c">Start in <em className="gold-txt">Ranchi.</em></span>, ""],
];

export default function Hero() {
  const reduce = useReducedMotion();
  const init = (o) => (reduce ? false : o);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <motion.p className="pill" initial={init({ opacity: 0, y: 16 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <i className="pill-dot" />CA and CS coaching in Lalpur, Ranchi
          </motion.p>
          <h1 id="hero-title" className="hero-title">
            {LINES.map(([txt, cls], i) => (
              <span className="line-mask" key={i}>
                <motion.span className={`line grad-txt ${cls}`} initial={init({ y: "110%", rotate: 4 })} animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease }}>
                  {txt}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="lede" initial={init({ opacity: 0, y: 20 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55, ease }}>
            <b>Foundation to Final. CSEET to Professional.</b> {D.faculty.length} teachers, including practising CAs, CSs and a High Court advocate, in H Square Mall, Lalpur.
          </motion.p>
          <motion.div className="actions" initial={init({ opacity: 0, y: 20 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease }}>
            <a className="btn btn--gold btn--shine" href={tel}><Phone />Book a free counselling call</a>
            <a className="btn btn--glass" href="#courses">See the courses<Arrow /></a>
          </motion.div>
          <motion.a className="rating" href={D.MAP_LINK} target="_blank" rel="noopener" initial={init({ opacity: 0 })} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.95 }}>
            <b>{D.GOOGLE_RATING}</b><Stars /><span>{D.GOOGLE_REVIEWS} Google reviews</span>
          </motion.a>
        </div>

        <motion.div className="stage" initial={init({ opacity: 0, scale: 0.92 })} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, delay: 0.2, ease }}>
          <div className="stage-halo" aria-hidden="true" />
          <div className="dial-wrap" aria-hidden="true"><Dial /></div>
          <Book3D />
          <Card3D className="float-card float-card--a" rest={{ x: 10, y: 18 }} depth={10} tilt={12} scrollTilt={0}>
            <span className="fc-k">State Topper</span>
            <b>{topper.name}</b>
            <span>CA Foundation</span>
          </Card3D>
          <Card3D className="float-card float-card--b" rest={{ x: 8, y: -18 }} depth={10} tilt={12} scrollTilt={0}>
            <span className="fc-k">Pass rate</span>
            <b className="fc-big">{D.PASS_RATE}%</b>
            <span>by the institute&apos;s own count</span>
          </Card3D>
          <p className="stage-tag">{TAGLINE}</p>
        </motion.div>
      </div>
    </section>
  );
}
