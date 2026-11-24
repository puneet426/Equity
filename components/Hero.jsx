import Book3D from "./Book3D";
import Card3D from "./Card3D";
import { D, TAGLINE, tel, topper } from "@/lib/site";
import { Phone, Arrow, Stars } from "./Icons";

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
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="pill">
            <i className="pill-dot" />CA and CS coaching in Lalpur, Ranchi
          </p>
          <h1 id="hero-title" className="hero-title">
            {LINES.map(([txt, cls], i) => (
              <span className="line-mask" key={i}>
                <span className={`line grad-txt ${cls}`}>{txt}</span>
              </span>
            ))}
          </h1>
          <p className="lede">
            <b>Foundation to Final. CSEET to Professional.</b> {D.faculty.length} teachers, including practising CAs, CSs and a High Court advocate, in H Square Mall, Lalpur.
          </p>
          <div className="actions">
            <a className="btn btn--gold btn--shine" href={tel}><Phone />Book a free counselling call</a>
            <a className="btn btn--glass" href="#courses">See the courses<Arrow /></a>
          </div>
          <a className="rating" href={D.MAP_LINK} target="_blank" rel="noopener">
            <b>{D.GOOGLE_RATING}</b><Stars /><span>{D.GOOGLE_REVIEWS} Google reviews</span>
          </a>
        </div>

        <div className="stage">
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
        </div>
      </div>
    </section>
  );
}
