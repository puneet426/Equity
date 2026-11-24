"use client";
import { motion, useReducedMotion } from "motion/react";

const variants = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } },
  flip: { hidden: { opacity: 0, rotateX: 35, y: 50 }, show: { opacity: 1, rotateX: 0, y: 0 } },
};

export default function Reveal({ children, as = "div", from = "up", delay = 0, className, stagger, ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) { const T = as; return <T className={className} {...rest}>{children}</T>; }
  return (
    <M className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={stagger ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } } : variants[from]}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }} {...rest}>
      {children}
    </M>
  );
}

export function RevealItem({ children, as = "div", from = "up", className, ...rest }) {
  const M = motion[as];
  return (
    <M className={className} variants={variants[from]} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} {...rest}>
      {children}
    </M>
  );
}
