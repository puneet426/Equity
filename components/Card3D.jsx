"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

/**
 * A glass slab with real thickness. Stacked layers behind the face show as an
 * extruded edge when the card tilts under the mouse.
 *   rest: resting tilt in degrees, e.g. { x: 8, y: -14 } for a showcase angle
 *   depth: slab thickness in px
 */
export default function Card3D({
  children, className = "", faceClassName = "", href, external, depth = 14, tilt = 9,
  rest = { x: 0, y: 0 }, scrollTilt: _unused, tone = "plum", as = "div", ...rest_props
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 160, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 160, damping: 18, mass: 0.6 });

  const rotateX = useTransform(sy, (y) => (reduce ? rest.x : rest.x - y * tilt));
  const rotateY = useTransform(sx, (x) => (reduce ? rest.y : rest.y + x * tilt));
  const glareX = useTransform(sx, (x) => `${50 + x * 50}%`);
  const glareY = useTransform(sy, (y) => `${50 + y * 50}%`);

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  const layers = Math.max(2, Math.min(4, Math.round(depth / 4)));
  const body = (
    <motion.div className="c3d-body" style={{ rotateX, rotateY }}>
      {Array.from({ length: layers }, (_, i) => (
        <span key={i} className="c3d-slab" aria-hidden="true"
          style={{ transform: `translateZ(${-(i + 1) * (depth / layers)}px)`, opacity: 1 - i / (layers * 1.6) }} />
      ))}
      <motion.div className={`c3d-face ${faceClassName}`} style={{ "--gx": glareX, "--gy": glareY }}>
        {children}
      </motion.div>
    </motion.div>
  );

  const cls = `c3d c3d--${tone} ${className}`;
  const handlers = { ref, onPointerMove: onMove, onPointerLeave: onLeave };
  if (href) {
    if (external) return <a className={cls} href={href} target="_blank" rel="noopener" {...handlers} {...rest_props}>{body}</a>;
    return <Link className={cls} href={href} {...handlers} {...rest_props}>{body}</Link>;
  }
  const Tag = as;
  return <Tag className={cls} {...handlers} {...rest_props}>{body}</Tag>;
}
