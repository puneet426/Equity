"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/* The batch photo starts tilted back in 3D and lies flat as you scroll to it. */
export default function TiltPhoto() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [28, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.86, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "0%"]);
  return (
    <section className="photo-sec" aria-label="Our students">
      <div className="wrap photo-persp" ref={ref}>
        <motion.figure className="photo" style={{ rotateX, scale }}>
          <motion.div className="photo-img" style={{ y: imgY }}>
            <Image src="/img/students.webp" alt="Around sixty Equity Classes students in navy institute T-shirts pose together on a green turf court beneath an Equity Classes banner"
              fill sizes="(max-width: 1300px) 100vw, 1260px" quality={90} />
          </motion.div>
          <figcaption><span className="pill-dot" />Equity Classes students, Ranchi</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
