import Image from "next/image";
import Book3D from "@/components/Book3D";
import { D, TAGLINE, topper } from "@/lib/site";

/* Temporary: rendered once by headless Chrome to make the 1200x630 share image, then deleted. */
export const metadata = { robots: { index: false } };

function Dial() {
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const a = (i * 5 * Math.PI) / 180;
    const [r1, r2] = i % 6 ? [188, 198] : [176, 198];
    const f = (n) => (200 + n).toFixed(2);
    return <line key={i} x1={f(r1 * Math.cos(a))} y1={f(r1 * Math.sin(a))} x2={f(r2 * Math.cos(a))} y2={f(r2 * Math.sin(a))} />;
  });
  return (
    <svg viewBox="0 0 400 400" style={{ width: "100%", display: "block" }} aria-hidden="true">
      <defs>
        <linearGradient id="ogd" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe2a8" /><stop offset=".5" stopColor="#f9c26a" /><stop offset="1" stopColor="#c9a8ee" />
        </linearGradient>
        <radialGradient id="ogg"><stop offset=".55" stopColor="#f9c26a" stopOpacity=".25" /><stop offset="1" stopColor="#f9c26a" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="200" cy="200" r="200" fill="url(#ogg)" />
      <g stroke="url(#ogd)" strokeWidth="1.8" strokeLinecap="round">{ticks}</g>
      <circle cx="200" cy="200" r="166" fill="none" stroke="url(#ogd)" strokeOpacity=".7" strokeWidth="1.8" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="#c9a8ee" strokeOpacity=".4" strokeWidth="1.2" strokeDasharray="2 7" />
    </svg>
  );
}

export default function OgPoster() {
  return (
    <div className="ogp">
      <style>{`
        .hdr,.ftr,.actbar,.bg{display:none!important}
        html,body{overflow:hidden!important;background:#16011f}
        .ogp{position:fixed;inset:0;z-index:9999;width:1200px;height:630px;overflow:hidden;
          background:radial-gradient(60% 80% at 78% 55%,#5e268a 0%,#320343 45%,#16011f 100%);font-family:var(--f-body)}
        .ogp::before{content:"";position:absolute;inset:0;background:radial-gradient(40% 50% at 12% 0%,#f9c26a22,transparent 70%),radial-gradient(35% 45% at 100% 100%,#c9a8ee22,transparent 70%)}
        .ogp-copy{position:absolute;left:72px;top:64px;width:620px;z-index:2}
        .ogp-brand{display:flex;align-items:center;gap:16px}
        .ogp-brand img{border-radius:50%;box-shadow:0 0 0 3px #f9c26a,0 10px 30px #0008}
        .ogp-word{font:800 30px/1 var(--f-display);color:#fff;letter-spacing:.01em}
        .ogp-word span{font-weight:300}
        .ogp-tag{font:600 15px/1 var(--f-display);color:#f9c26a;margin-top:8px}
        .ogp h1{white-space:nowrap;font:900 66px/1.04 var(--f-display);letter-spacing:-.02em;margin:46px 0 0;color:#fff}
        .ogp h1 .t{font-weight:300}
        .ogp h1 em{font-style:normal;background:linear-gradient(180deg,#ffe2a8,#f9c26a 55%,#e39a3b);-webkit-background-clip:text;background-clip:text;color:transparent}
        .ogp-row{display:flex;gap:12px;margin-top:40px}
        .ogp-chip{display:flex;align-items:center;gap:10px;padding:12px 18px;border-radius:14px;background:#ffffff12;box-shadow:inset 0 1px 0 #ffffff22,0 10px 24px #0005;color:#f8f1fc;font:600 17px/1 var(--f-display)}
        .ogp-chip b{color:#f9c26a;font-weight:800}
        .ogp-stage{position:absolute;right:-10px;top:10px;width:600px;height:612px}
        .ogp-stage .book3d-fallback{display:none}
        .ogp-halo{position:absolute;inset:8%;border-radius:50%;background:radial-gradient(closest-side,#7a3fae88,#5e268a33 55%,transparent 75%)}
        .ogp-dial{position:absolute;left:50%;top:71%;width:104%;transform:translate(-50%,-50%) perspective(900px) rotateX(74deg)}
        .ogp-url{position:absolute;left:72px;bottom:44px;z-index:2;font:600 16px/1 var(--f-display);color:#d2c3df;letter-spacing:.04em}
      `}</style>
      <div className="ogp-copy">
        <div className="ogp-brand">
          <Image src="/img/logo-round.png" alt="" width={64} height={64} priority />
          <div>
            <div className="ogp-word">EQUITY <span>CLASSES</span></div>
            <div className="ogp-tag">{TAGLINE}</div>
          </div>
        </div>
        <h1>Become a <em>CA.</em><br /><span className="t">Or a CS.</span><br />Start in <em>Ranchi.</em></h1>
        <div className="ogp-row">
          <span className="ogp-chip"><b>{D.GOOGLE_RATING} ★</b>{D.GOOGLE_REVIEWS} Google reviews</span>
          <span className="ogp-chip"><b>State topper</b>{topper.name}</span>
        </div>
      </div>
      <p className="ogp-url">H SQUARE MALL, LALPUR, RANCHI</p>
      <div className="ogp-stage">
        <div className="ogp-halo" />
        <div className="ogp-dial"><Dial /></div>
        <Book3D />
      </div>
    </div>
  );
}
