// The Equity Classes logo book, modelled in 3D.
// Plum cover cut into an "E", spine on the left, white page blocks in the notches,
// gold ribbon on top. Two thin gold orbits for "Creating a Financial Ecosystem".
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

const host = document.getElementById("book3d");
if (host) {
  try { init(host); } catch (err) { console.warn("3D book disabled:", err); }
}

function init(host) {
  const test = document.createElement("canvas");
  if (!(test.getContext("webgl2") || test.getContext("webgl"))) return;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const C = { cover: 0x3c0066, spine: 0x5e268a, gold: 0xf9c26a, page: 0xfbf8f2, plum: 0x320343 };

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  const phone = matchMedia("(max-width: 720px), (pointer: coarse)").matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio, phone ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0.6, 11);

  // ---- light: soft studio setup on white ----
  scene.add(new THREE.HemisphereLight(0xf1e6ff, 0x1c0226, 1.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(2.5, 9, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(phone ? 512 : 1024, phone ? 512 : 1024);
  key.shadow.radius = 10;
  key.shadow.blurSamples = 20;
  Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 30 });
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffd79a, 3.2);
  rim.position.set(-6, 3, -5);
  scene.add(rim);
  const rim2 = new THREE.DirectionalLight(0xc9a8ee, 2.6);
  rim2.position.set(7, 1, -3);
  scene.add(rim2);
  const fill = new THREE.PointLight(0xffffff, 18, 14);
  fill.position.set(-3, 1.5, 6);
  scene.add(fill);

  // ---- book dimensions (from the logo's proportions) ----
  const W = 1.95, H = 2.55, D = 0.62, SP = 0.48;
  const nx = W * 0.29, nh = H * 0.085;
  const n1 = H * (1 - 0.32), n2 = H * (1 - 0.69); // notch centres from bottom

  const bevel = { bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.03, bevelSegments: 4, curveSegments: 24 };

  // cover: rectangle with two notches cut in from the right edge
  const cover = new THREE.Shape();
  cover.moveTo(0, 0);
  cover.lineTo(W, 0);
  cover.lineTo(W, n2 - nh / 2); cover.lineTo(nx, n2 - nh / 2); cover.lineTo(nx, n2 + nh / 2); cover.lineTo(W, n2 + nh / 2);
  cover.lineTo(W, n1 - nh / 2); cover.lineTo(nx, n1 - nh / 2); cover.lineTo(nx, n1 + nh / 2); cover.lineTo(W, n1 + nh / 2);
  cover.lineTo(W, H);
  cover.lineTo(0, H);
  cover.lineTo(0, 0);

  const coverMat = new THREE.MeshPhysicalMaterial({ color: 0x4a0f80, roughness: 0.42, clearcoat: 0.6, clearcoatRoughness: 0.35, sheen: 0.4, sheenColor: new THREE.Color(0x8a5bc0) });
  const spineMat = new THREE.MeshPhysicalMaterial({ color: 0x7434ab, roughness: 0.45, clearcoat: 0.5, clearcoatRoughness: 0.4 });
  const goldMat = new THREE.MeshPhysicalMaterial({ color: C.gold, roughness: 0.38, metalness: 0.08, clearcoat: 0.9, emissive: 0x5a3a08, emissiveIntensity: 0.18 });

  const book = new THREE.Group();
  const coverMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(cover, { depth: D, ...bevel }), coverMat);
  coverMesh.castShadow = true;
  book.add(coverMesh);

  // spine with the rounded bottom-left corner from the logo
  const sp = new THREE.Shape();
  const r = 0.32;
  sp.moveTo(-SP, r);
  sp.quadraticCurveTo(-SP, 0, -SP + r, 0);
  sp.lineTo(0.02, 0); sp.lineTo(0.02, H); sp.lineTo(-SP, H); sp.lineTo(-SP, r);
  const spineMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(sp, { depth: D + 0.04, ...bevel }), spineMat);
  spineMesh.position.z = -0.02;
  spineMesh.castShadow = true;
  book.add(spineMesh);

  // page blocks in the notches, with ruled page edges
  const pageTex = (() => {
    const c = document.createElement("canvas");
    c.width = 256; c.height = 64;
    const g = c.getContext("2d");
    g.fillStyle = "#fbf8f2"; g.fillRect(0, 0, 256, 64);
    g.fillStyle = "#2a2230";
    for (let y = 9; y < 64; y += 15) g.fillRect(0, y, 256, 4.5);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  })();
  const plain = new THREE.MeshStandardMaterial({ color: C.page, roughness: 0.85 });
  const ruled = new THREE.MeshStandardMaterial({ map: pageTex, roughness: 0.8 });
  [n1, n2].forEach((ny) => {
    const g = new THREE.BoxGeometry(W - nx - 0.03, nh * 0.98, D - 0.02);
    // box face order: +x, -x, +y, -y, +z (front), -z
    const m = new THREE.Mesh(g, [ruled, plain, plain, plain, ruled, plain]);
    m.position.set(nx + (W - nx - 0.03) / 2, ny, D / 2 + 0.01);
    m.castShadow = true;
    book.add(m);
  });

  // gold ribbon with the V cut, lying on the front cover
  const rb = new THREE.Shape();
  const rw = 0.3, rl = 0.62;
  rb.moveTo(0, 0); rb.lineTo(rw / 2, 0.16); rb.lineTo(rw, 0); rb.lineTo(rw, rl); rb.lineTo(0, rl); rb.lineTo(0, 0);
  const ribbon = new THREE.Mesh(new THREE.ExtrudeGeometry(rb, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.008, bevelSegments: 2 }), goldMat);
  ribbon.position.set(0.1, H - rl + 0.12, D + 0.045);
  ribbon.castShadow = true;
  book.add(ribbon);

  book.position.set(-(W - SP) / 2, -H / 2, -D / 2);
  const bookPivot = new THREE.Group();
  bookPivot.add(book);

  // ---- orbits ----
  const orbit = new THREE.Group();
  const ringMat = new THREE.MeshStandardMaterial({ color: C.gold, roughness: 0.4, metalness: 0.1, emissive: 0x5a3a08, emissiveIntensity: 0.2 });
  const lilac = new THREE.MeshStandardMaterial({ color: 0xc9a8ee, roughness: 0.5, emissive: 0x3a2060, emissiveIntensity: 0.5 });
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.012, 12, 180), ringMat);
  ringA.rotation.set(Math.PI / 2.25, 0.18, 0);
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.008, 12, 180), lilac);
  ringB.rotation.set(Math.PI / 1.85, -0.35, 0.3);
  orbit.add(ringA, ringB);
  const beads = [];
  const beadGeo = new THREE.SphereGeometry(0.075, 24, 24);
  const beadMat = goldMat;
  [[ringA, 2.35, 0, beadMat], [ringA, 2.35, Math.PI * 0.9, beadMat], [ringB, 2.75, Math.PI * 0.4, beadMat], [ringB, 2.75, Math.PI * 1.5, beadMat]]
    .forEach(([ring, rad, a, mat]) => {
      const b = new THREE.Mesh(beadGeo, mat);
      b.castShadow = true;
      ring.add(b);
      beads.push({ b, rad, a, speed: ring === ringA ? 0.22 : -0.15 });
    });

  const world = new THREE.Group();
  world.add(bookPivot, orbit);
  scene.add(world);

  // shadow catcher
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.ShadowMaterial({ opacity: 0 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.75;
  ground.receiveShadow = false;
  ground.visible = false; // no dark floor patch under the book
  scene.add(ground);

  host.appendChild(renderer.domElement);
  host.classList.add("is-live");

  const size = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w / h < 0.9 ? 13.8 : 11.6;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(size).observe(host);
  size();

  // ---- motion ----
  let tx = 0, ty = 0, cx = 0, cy = 0, scrollT = 0;
  addEventListener("pointermove", (e) => {
    tx = (e.clientX / innerWidth - 0.5) * 2;
    ty = (e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });
  addEventListener("scroll", () => {
    const rect = host.getBoundingClientRect();
    scrollT = Math.min(1, Math.max(0, -rect.top / rect.height));
  }, { passive: true });

  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !reduce) loop(); }).observe(host);

  const clock = new THREE.Clock();
  const base = { y: -0.52, x: 0.1 };

  function frame(t) {
    cx += (tx - cx) * 0.05;
    cy += (ty - cy) * 0.05;
    bookPivot.rotation.y = base.y + Math.sin(t * 0.45) * 0.16 + cx * 0.35 + scrollT * 1.4;
    bookPivot.rotation.x = base.x + cy * 0.12;
    bookPivot.position.y = Math.sin(t * 0.9) * 0.07;
    orbit.rotation.y = t * 0.05 + cx * 0.1;
    beads.forEach((o) => {
      const a = o.a + t * o.speed;
      o.b.position.set(Math.cos(a) * o.rad, Math.sin(a) * o.rad, 0);
    });
    renderer.render(scene, camera);
  }

  let raf = 0;
  function loop() {
    cancelAnimationFrame(raf);
    const tick = () => {
      if (!visible) return;
      frame(clock.getElapsedTime());
      raf = requestAnimationFrame(tick);
    };
    tick();
  }

  if (reduce) frame(1.2);
  else {
    // entrance: book rises and turns into place
    world.scale.setScalar(0.001);
    const t0 = performance.now();
    const grow = () => {
      const k = Math.min(1, (performance.now() - t0) / 1300);
      const e = 1 - Math.pow(1 - k, 4);
      world.scale.setScalar(0.6 + 0.4 * e);
      world.rotation.y = (1 - e) * -1.2;
      if (k < 1) requestAnimationFrame(grow);
    };
    grow();
    loop();
  }
}
