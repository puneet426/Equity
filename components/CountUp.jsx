"use client";
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export default function CountUp({ to, decimals = 0, duration = 1.8 }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!seen || reduce) return;
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => { if (ref.current) ref.current.textContent = v.toFixed(decimals); } });
    return () => c.stop();
  }, [seen, reduce, to, decimals, duration]);
  return <span ref={ref}>{Number(to).toFixed(decimals)}</span>;
}
