"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* A turning 3D ring of achiever portraits. Drag or use arrow keys. Flat grid if motion is reduced. */
export default function Ring({ people }) {
  const stage = useRef(null);
  const ring = useRef(null);
  const [flat, setFlat] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setFlat(true); return; }
    const st = stage.current, rg = ring.current, cards = [...rg.children], n = cards.length;
    const step = 360 / n;
    let radius = 0, angle = 0, vel = -0.1, idle = -0.1, dragging = false, lastX = 0, hover = false, onScreen = true, raf = 0;

    const layout = () => {
      const small = st.clientWidth < 560, w = small ? 96 : 150;
      radius = Math.round(Math.min((w * n) / (2 * Math.PI), st.clientWidth * (small ? 0.8 : 0.56)));
      cards.forEach((c, i) => { c.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`; });
    };
    const draw = () => { rg.style.transform = `translateZ(${-radius}px) rotateX(-8deg) rotateY(${angle}deg)`; };
    const tick = () => {
      if (!dragging) { vel += ((hover ? 0 : idle) - vel) * 0.04; angle += vel; }
      draw();
      if (onScreen) raf = requestAnimationFrame(tick);
    };
    const ro = new ResizeObserver(() => { layout(); draw(); }); ro.observe(st);
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; cancelAnimationFrame(raf); if (onScreen) tick(); });
    io.observe(st);

    const down = (e) => { dragging = true; lastX = e.clientX; st.setPointerCapture(e.pointerId); st.classList.add("is-drag"); };
    const move = (e) => { if (!dragging) return; const dx = e.clientX - lastX; lastX = e.clientX; vel = dx * 0.25; angle += vel; };
    const up = () => { dragging = false; st.classList.remove("is-drag"); };
    const key = (e) => { if (e.key === "ArrowLeft") { vel = 3; e.preventDefault(); } if (e.key === "ArrowRight") { vel = -3; e.preventDefault(); } };
    const enter = (e) => { if (e.pointerType === "mouse") hover = true; };
    const leave = () => { hover = false; };
    st.addEventListener("pointerdown", down); st.addEventListener("pointermove", move);
    st.addEventListener("pointerup", up); st.addEventListener("pointercancel", up);
    st.addEventListener("keydown", key); st.addEventListener("pointerenter", enter); st.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      st.removeEventListener("pointerdown", down); st.removeEventListener("pointermove", move);
      st.removeEventListener("pointerup", up); st.removeEventListener("pointercancel", up);
      st.removeEventListener("keydown", key); st.removeEventListener("pointerenter", enter); st.removeEventListener("pointerleave", leave);
    };
  }, []);

  if (flat) {
    return (
      <ul className="ring-flat">
        {people.slice(0, 12).map((a) => (
          <li key={a.slug}><Image src={`/img/achievers/${a.slug}.webp`} alt="" width={96} height={96} quality={90} /><b>{a.name}</b></li>
        ))}
      </ul>
    );
  }
  return (
    <div className="ring-stage" ref={stage} tabIndex={0} aria-label={`Rotating ring of ${people.length} achievers. Drag, or use the left and right arrow keys, to turn it.`}>
      <ul className="ring" ref={ring}>
        {people.map((a) => (
          <li key={a.slug}>
            <Image src={`/img/achievers/${a.slug}.webp`} alt={`${a.name}, ${a.course} achiever`} width={128} height={128} quality={90} draggable={false} />
            <b>{a.name}</b><span>{a.course}</span>
          </li>
        ))}
      </ul>
      <div className="ring-floor" aria-hidden="true" />
    </div>
  );
}
