"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* The Equity Classes logo book in 3D: plum "E" cover, spine, ruled pages, gold ribbon, gold orbits. */
export default function Book3D() {
  const host = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;
    const test = document.createElement("canvas");
    if (!(test.getContext("webgl2") || test.getContext("webgl"))) return;
    import("three").then((THREE) => {
      if (cancelled || !host.current) return;
      try { dispose = init(THREE, host.current, () => setLive(true)); } catch (e) { console.warn("3D book disabled", e); }
    });
    return () => { cancelled = true; dispose(); };
  }, []);

  return (
    <div ref={host} className={`book3d${live ? " is-live" : ""}`} role="img" aria-label="The Equity Classes book logo in 3D, with gold orbits around it">
      <Image className="book3d-fallback" src="/img/mark.png" alt="" width={487} height={540} priority />
    </div>
  );
}

function init(THREE, host, onLive) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const phone = matchMedia("(max-width: 720px), (pointer: coarse)").matches;
  const gold = 0xf9c26a;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, phone ? 1.75 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0.6, 11);

  scene.add(new THREE.HemisphereLight(0xf1e6ff, 0x1c0226, 1.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(2.5, 9, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffd79a, 3.6); rim.position.set(-6, 3, -5); scene.add(rim);
  const rim2 = new THREE.DirectionalLight(0xc9a8ee, 3); rim2.position.set(7, 1, -3); scene.add(rim2);
  const fill = new THREE.PointLight(0xffffff, 18, 14); fill.position.set(-3, 1.5, 6); scene.add(fill);

  const W = 1.95, H = 2.55, D = 0.62, SP = 0.48;
  const nx = W * 0.29, nh = H * 0.085;
  const n1 = H * (1 - 0.32), n2 = H * (1 - 0.69);
  const bevel = { bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.03, bevelSegments: 4, curveSegments: 24 };

  const cover = new THREE.Shape();
  cover.moveTo(0, 0); cover.lineTo(W, 0);
  cover.lineTo(W, n2 - nh / 2); cover.lineTo(nx, n2 - nh / 2); cover.lineTo(nx, n2 + nh / 2); cover.lineTo(W, n2 + nh / 2);
  cover.lineTo(W, n1 - nh / 2); cover.lineTo(nx, n1 - nh / 2); cover.lineTo(nx, n1 + nh / 2); cover.lineTo(W, n1 + nh / 2);
  cover.lineTo(W, H); cover.lineTo(0, H); cover.lineTo(0, 0);

  const coverMat = new THREE.MeshPhysicalMaterial({ color: 0x4a0f80, roughness: 0.4, clearcoat: 0.7, clearcoatRoughness: 0.3, sheen: 0.4, sheenColor: new THREE.Color(0x8a5bc0) });
  const spineMat = new THREE.MeshPhysicalMaterial({ color: 0x7434ab, roughness: 0.45, clearcoat: 0.5, clearcoatRoughness: 0.4 });
  const goldMat = new THREE.MeshPhysicalMaterial({ color: gold, roughness: 0.32, metalness: 0.1, clearcoat: 1, emissive: 0x5a3a08, emissiveIntensity: 0.22 });

  const book = new THREE.Group();
  book.add(new THREE.Mesh(new THREE.ExtrudeGeometry(cover, { depth: D, ...bevel }), coverMat));

  const sp = new THREE.Shape(); const r = 0.32;
  sp.moveTo(-SP, r); sp.quadraticCurveTo(-SP, 0, -SP + r, 0);
  sp.lineTo(0.02, 0); sp.lineTo(0.02, H); sp.lineTo(-SP, H); sp.lineTo(-SP, r);
  const spine = new THREE.Mesh(new THREE.ExtrudeGeometry(sp, { depth: D + 0.04, ...bevel }), spineMat);
  spine.position.z = -0.02; book.add(spine);

  const c = document.createElement("canvas"); c.width = 256; c.height = 64;
  const g = c.getContext("2d");
  g.fillStyle = "#fbf8f2"; g.fillRect(0, 0, 256, 64);
  g.fillStyle = "#2a2230"; for (let y = 9; y < 64; y += 15) g.fillRect(0, y, 256, 4.5);
  const pageTex = new THREE.CanvasTexture(c); pageTex.colorSpace = THREE.SRGBColorSpace; pageTex.anisotropy = 8;
  const plain = new THREE.MeshStandardMaterial({ color: 0xfbf8f2, roughness: 0.85 });
  const ruled = new THREE.MeshStandardMaterial({ map: pageTex, roughness: 0.8 });
  [n1, n2].forEach((ny) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(W - nx - 0.03, nh * 0.98, D - 0.02), [ruled, plain, plain, plain, ruled, plain]);
    m.position.set(nx + (W - nx - 0.03) / 2, ny, D / 2 + 0.01); book.add(m);
  });

  const rb = new THREE.Shape(); const rw = 0.3, rl = 0.62;
  rb.moveTo(0, 0); rb.lineTo(rw / 2, 0.16); rb.lineTo(rw, 0); rb.lineTo(rw, rl); rb.lineTo(0, rl); rb.lineTo(0, 0);
  const ribbon = new THREE.Mesh(new THREE.ExtrudeGeometry(rb, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.008, bevelSegments: 2 }), goldMat);
  ribbon.position.set(0.1, H - rl + 0.12, D + 0.045); book.add(ribbon);

  book.position.set(-(W - SP) / 2, -H / 2, -D / 2);
  const pivot = new THREE.Group(); pivot.add(book);

  const orbit = new THREE.Group();
  const ringMat = new THREE.MeshStandardMaterial({ color: gold, roughness: 0.4, metalness: 0.1, emissive: 0x5a3a08, emissiveIntensity: 0.35 });
  const lilac = new THREE.MeshStandardMaterial({ color: 0xc9a8ee, roughness: 0.5, emissive: 0x3a2060, emissiveIntensity: 0.6 });
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.013, 12, 200), ringMat); ringA.rotation.set(Math.PI / 2.25, 0.18, 0);
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.009, 12, 200), lilac); ringB.rotation.set(Math.PI / 1.85, -0.35, 0.3);
  orbit.add(ringA, ringB);
  const beads = [];
  const beadGeo = new THREE.SphereGeometry(0.08, 24, 24);
  [[ringA, 2.35, 0], [ringA, 2.35, Math.PI * 0.9], [ringB, 2.75, Math.PI * 0.4], [ringB, 2.75, Math.PI * 1.5]].forEach(([ring, rad, a]) => {
    const b = new THREE.Mesh(beadGeo, goldMat); ring.add(b);
    beads.push({ b, rad, a, speed: ring === ringA ? 0.22 : -0.15 });
  });

  const world = new THREE.Group(); world.add(pivot, orbit); scene.add(world);
  host.appendChild(renderer.domElement);
  onLive();

  const size = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w / h < 0.9 ? 13.8 : 11.6;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(size); ro.observe(host); size();

  let tx = 0, ty = 0, cx = 0, cy = 0, scrollT = 0, visible = true, raf = 0;
  const onPointer = (e) => { tx = (e.clientX / innerWidth - 0.5) * 2; ty = (e.clientY / innerHeight - 0.5) * 2; };
  const onScroll = () => { const rc = host.getBoundingClientRect(); scrollT = Math.min(1, Math.max(0, -rc.top / rc.height)); };
  addEventListener("pointermove", onPointer, { passive: true });
  addEventListener("scroll", onScroll, { passive: true });
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !reduce) loop(); });
  io.observe(host);

  const clock = new THREE.Clock();
  const frame = (t) => {
    cx += (tx - cx) * 0.05; cy += (ty - cy) * 0.05;
    pivot.rotation.y = -0.52 + Math.sin(t * 0.45) * 0.16 + cx * 0.35 + scrollT * 1.4;
    pivot.rotation.x = 0.1 + cy * 0.12;
    pivot.position.y = Math.sin(t * 0.9) * 0.07;
    orbit.rotation.y = t * 0.05 + cx * 0.1;
    beads.forEach((o) => { const a = o.a + t * o.speed; o.b.position.set(Math.cos(a) * o.rad, Math.sin(a) * o.rad, 0); });
    renderer.render(scene, camera);
  };
  function loop() {
    cancelAnimationFrame(raf);
    const tick = () => { if (!visible) return; frame(clock.getElapsedTime()); raf = requestAnimationFrame(tick); };
    tick();
  }

  if (reduce) frame(1.2);
  else {
    world.scale.setScalar(0.001);
    const t0 = performance.now();
    const grow = () => {
      const k = Math.min(1, (performance.now() - t0) / 1400), e = 1 - Math.pow(1 - k, 4);
      world.scale.setScalar(0.6 + 0.4 * e); world.rotation.y = (1 - e) * -1.2;
      if (k < 1) requestAnimationFrame(grow);
    };
    grow(); loop();
  }

  return () => {
    cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
    removeEventListener("pointermove", onPointer); removeEventListener("scroll", onScroll);
    renderer.dispose(); renderer.domElement.remove();
  };
}
