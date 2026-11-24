import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Card3D from "@/components/Card3D";
import Reveal, { RevealItem } from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Marquee from "@/components/Marquee";
import CountUp from "@/components/CountUp";
import TiltPhoto from "@/components/TiltPhoto";
import IsoSteps from "@/components/IsoSteps";
import Ring from "@/components/Ring";
import Faq from "@/components/Faq";
import EnquiryForm from "@/components/EnquiryForm";
import Testimonials from "@/components/Testimonials";
import { WhatsApp, Phone, Arrow, Stars, Glyphs, MapPin, Mail } from "@/components/Icons";
import { D, TAGLINE, HELLO, wa, tel, leads, roster, topper, nCA, nCS, facultyById, COURSES, TEACH, METHOD, FAQ } from "@/lib/site";

const faqLd = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

const TRACKS = [
  {
    id: "ca", name: "CA", body: "Chartered Accountancy · ICAI",
    intro: "Full preparation for CA Foundation, Intermediate and Final, with structured study material written around the exam.",
    levels: [["CA Foundation", "The entry exam after Class 12."], ["CA Intermediate", "The second level, after Foundation."], ["CA Final", "The last level. Taught by practising CAs."]],
    chips: ["Concepts first", "Exam-oriented notes", "Regular mock tests"],
    steps: { top: "#f9c26a", left: "#7a3fae", right: "#4b1872" }, rest: { x: 6, y: 10 },
  },
  {
    id: "cs", name: "CS", body: "Company Secretary · ICSI",
    intro: "Complete coaching for CSEET, CS Executive and CS Professional, with in-depth subject coverage and mentoring for each student.",
    levels: [["CSEET", "The entrance test for the CS course."], ["CS Executive", "Company law, tax and the core papers."], ["CS Professional", "The final level of the CS course."]],
    chips: ["Individual attention", "Doubt-clearing sessions", "Structured curriculum"],
    steps: { top: "#ffffff", left: "#c9a8ee", right: "#7a3fae" }, rest: { x: 6, y: -10 },
  },
];

const Glyphs4 = Glyphs[3];

export default function Home() {
  const ca = D.achievers.slice(1).filter((a) => a.course === "CA");
  const cs = D.achievers.filter((a) => a.course === "CS");
  const ring = ca.flatMap((a, i) => (cs[i] ? [a, cs[i]] : [a])).slice(0, 16);
  const reviews = [D.reviews[4], ...D.reviews.filter((_, i) => i !== 4)];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Hero />

      <Marquee className="ticker" speed={36}>
        {COURSES.map((c) => <span key={c} className="ticker-item">{c}<i aria-hidden="true">✦</i></span>)}
      </Marquee>

      {/* ---------------- stats ---------------- */}
      <section className="sec sec--tight" aria-label="Equity Classes in numbers">
        <Reveal className="wrap stats" stagger={0.1}>
          {[
            [<><CountUp to={5} decimals={1} /><small>/5</small></>, `Google rating from ${D.GOOGLE_REVIEWS} reviews`],
            [<><CountUp to={D.PASS_RATE} /><small>%</small></>, "Pass rate, by the institute's count"],
            [<CountUp key="a" to={D.achievers.length} />, "Achievers named on this site"],
            [<CountUp key="f" to={D.faculty.length} />, "Faculty: CA, CS, CMA, LL.M"],
          ].map(([n, l], i) => (
            <RevealItem key={i} from="flip">
              <Card3D className="stat" depth={12} rest={{ x: 0, y: i < 2 ? 6 : -6 }}>
                <b className="stat-n grad-txt">{n}</b>
                <span className="stat-l">{l}</span>
              </Card3D>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <TiltPhoto />

      {/* ---------------- courses ---------------- */}
      <section className="sec" id="courses" aria-labelledby="courses-title">
        <div className="wrap">
          <SectionHead id="courses-title" kicker="Courses" title="Two tracks." thin="Six exams.">
            Join at the level you are at now. Each subject is taught by a specialist in it, and the list further down shows who teaches what.
          </SectionHead>
          <div className="tracks">
            {TRACKS.map((t, ti) => (
              <Reveal key={t.id} from={ti ? "right" : "left"}>
                <Card3D as="article" className={`track track--${t.id}`} depth={20} tilt={6} rest={t.rest} aria-labelledby={`${t.id}-t`}>
                  <div className="track-top">
                    <div>
                      <h3 id={`${t.id}-t`} className="track-name">{t.name}</h3>
                      <p className="track-body">{t.body}</p>
                    </div>
                    <IsoSteps {...t.steps} />
                  </div>
                  <p>{t.intro}</p>
                  <ol className="levels">
                    {t.levels.map(([l, d], i) => (
                      <li key={l}><i>{i + 1}</i><div><b>{l}</b><span>{d}</span></div></li>
                    ))}
                  </ol>
                  <ul className="chips-row">{t.chips.map((c) => <li key={c}>{c}</li>)}</ul>
                  <a className="btn btn--gold" href={wa(`Hello Equity Classes, I want to know about ${t.name} batches.`)} target="_blank" rel="noopener">
                    <WhatsApp />Ask about {t.name} batches
                  </a>
                </Card3D>
              </Reveal>
            ))}
          </div>

          <Reveal className="teach">
            <div className="teach-head">
              <h3 className="h3 grad-txt">Who teaches what</h3>
              <p>Every subject has its own teacher. Tap a name to read their profile.</p>
            </div>
            <ul className="teach-grid">
              {TEACH.map(([subject, id, level]) => {
                const f = facultyById[id];
                return (
                  <li key={subject}>
                    <Link href={`/faculty/${id}`} className="teach-row">
                      <Image src={`/img/team/${id}.webp`} alt="" width={56} height={56} quality={90} />
                      <div><b>{subject}</b><span>{f.name}</span></div>
                      <em>{level}</em>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------- method ---------------- */}
      <section className="sec sec--glow" id="method" aria-labelledby="method-title">
        <div className="wrap method">
          <div className="method-side">
            <SectionHead id="method-title" kicker="How classes run" title="Small rooms." thin="Every doubt answered." />
            <Reveal delay={0.1}>
              <p className="method-p">Professional exams are long and the syllabus is heavy. What helps most is a teacher who knows where you are stuck, and a place where asking is normal.</p>
              <blockquote className="pull">
                <p>&ldquo;The environment is so friendly and competitive at the same time.&rdquo;</p>
                <footer>{D.reviews[0].name}, on Google</footer>
              </blockquote>
            </Reveal>
          </div>
          <Reveal className="points" stagger={0.08}>
            {METHOD.map(([t, d], i) => {
              const G = Glyphs[i];
              return (
                <RevealItem key={t} from="flip">
                  <Card3D className="point" depth={10} rest={{ x: 0, y: i % 2 ? -5 : 5 }}>
                    <span className="point-ico"><G /></span>
                    <b>{t}</b>
                    <p>{d}</p>
                  </Card3D>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ---------------- results ---------------- */}
      <section className="sec" id="results" aria-labelledby="results-title">
        <div className="wrap">
          <SectionHead id="results-title" kicker="Results" title="The students" thin="who passed.">
            {D.achievers.length} Equity Classes students who cleared their CA or CS exams, with their photos. {nCA} in CA and {nCS} in CS so far.
          </SectionHead>
          <div className="results">
            <Reveal from="left">
              <Card3D className="topper" depth={22} tilt={8} rest={{ x: 4, y: 12 }}>
                <span className="topper-ribbon">State<br />Topper</span>
                <div className="topper-photo">
                  <Image src={`/img/achievers/${topper.slug}.webp`} alt={`${topper.name}, State Topper in CA Foundation`} width={220} height={220} quality={90} />
                </div>
                <h3 className="grad-txt">{topper.name}</h3>
                <p>State Topper, CA Foundation</p>
                <div className="topper-stats">
                  <div><b className="gold-txt">{D.PASS_RATE}%</b><span>pass rate, by the institute&apos;s count</span></div>
                  <div><b className="gold-txt">{D.achievers.length}</b><span>named achievers</span></div>
                </div>
              </Card3D>
            </Reveal>
            <Reveal from="zoom" className="ring-col">
              <Ring people={ring} />
              <div className="results-foot">
                <Link className="btn btn--glass" href="/results">See all {D.achievers.length} achievers<Arrow /></Link>
                <span className="hint">Drag the ring to turn it</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- faculty ---------------- */}
      <section className="sec sec--glow" id="faculty" aria-labelledby="faculty-title">
        <div className="wrap">
          <SectionHead id="faculty-title" kicker="Faculty" title="Who" thin="teaches you.">
            Chartered Accountants, Company Secretaries, a cost accountant, an MBA and a practising advocate. Some of them still work in practice alongside teaching.
          </SectionHead>
          <div className="leads">
            {leads.map((f, i) => (
              <Reveal key={f.id} from={i ? "right" : "left"}>
                <Card3D href={`/faculty/${f.id}`} className="lead" depth={18} tilt={7} rest={{ x: 3, y: i ? -7 : 7 }}>
                  <div className="lead-photo">
                    <Image src={`/img/team/${f.id}.webp`} alt={`Portrait of ${f.name}`} width={400} height={400} quality={90} sizes="(max-width: 720px) 90vw, 280px" />
                  </div>
                  <div className="lead-txt">
                    <span className="role">{f.role} · {f.experience}</span>
                    <h3 className="grad-txt">{f.name}</h3>
                    <p>{f.short}</p>
                    <span className="more">Read profile<Arrow /></span>
                  </div>
                </Card3D>
              </Reveal>
            ))}
          </div>
          <Reveal className="roster" stagger={0.06}>
            {roster.map((f) => (
              <RevealItem key={f.id} from="up">
                <Card3D href={`/faculty/${f.id}`} className="mate" depth={10} tilt={10}>
                  <Image src={`/img/team/${f.id}.webp`} alt="" width={160} height={160} quality={90} />
                  <b>{f.name}</b>
                  <span>{f.expertise}{f.level ? ` · ${f.level}` : ""}</span>
                </Card3D>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- reviews ---------------- */}
      <section className="sec sec--glow" id="reviews" aria-labelledby="reviews-title">
        <div className="wrap">
          <SectionHead id="reviews-title" kicker="Reviews" title="What students" thin="say about us.">
            Six reviews, word for word, from students who studied here. Every one of them gave five stars.
          </SectionHead>
          <Reveal from="up">
            <Testimonials reviews={reviews} faces={D.achievers.slice(0, 10)} rating={D.GOOGLE_RATING} count={D.GOOGLE_REVIEWS} mapLink={D.MAP_LINK} />
          </Reveal>
        </div>
      </section>

      {/* ---------------- visit ---------------- */}
      <section className="sec" id="visit" aria-labelledby="visit-title">
        <div className="wrap visit">
          <div>
            <SectionHead id="visit-title" kicker="Visit or enquire" title="Drop in," thin="or send a message." />
            <Reveal className="contact-cards" stagger={0.08}>
              {[
                [MapPin, "Address", <>{D.ADDRESS_1},<br />{D.ADDRESS_2}. {D.ADDRESS_NOTE}.</>, D.MAP_LINK],
                [Phone, "Phone", D.PHONE_OFFICE_SHOW, tel],
                [WhatsApp, "WhatsApp", "87978 34974", `https://wa.me/${D.WA_ENQUIRY}`],
                [Mail, "Email", D.EMAIL, `mailto:${D.EMAIL}`],
              ].map(([I, k, val, href]) => (
                <RevealItem key={k}>
                  <a className="ccard" href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
                    <span className="ccard-ico"><I /></span>
                    <span><small>{k}</small><b>{val}</b></span>
                  </a>
                </RevealItem>
              ))}
            </Reveal>
            <p className="hours"><i className="pill-dot" />{D.HOURS}. Closed Sunday.</p>
            <Reveal className="map-wrap" from="zoom">
              <iframe className="map" src={D.MAP_EMBED} title="Map: Equity Classes, H Square Mall, Lalpur, Ranchi" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </Reveal>
          </div>
          <Reveal from="right">
            <Card3D className="form-card" depth={16} tilt={2} scrollTilt={3} rest={{ x: 0, y: -4 }}>
              <EnquiryForm />
            </Card3D>
          </Reveal>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="sec sec--tight" id="faq" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <div>
            <SectionHead id="faq-title" kicker="Questions" title="Asked at" thin="the front desk." />
            <Reveal from="left">
              <Card3D className="faq-help" depth={14} rest={{ x: 4, y: 8 }}>
                <span className="point-ico"><Glyphs4 /></span>
                <b>Still have a question?</b>
                <p>Ask us on WhatsApp. A counsellor replies during office hours, Monday to Saturday.</p>
                <a className="btn btn--gold btn--sm" href={wa("Hello Equity Classes, I have a question.")} target="_blank" rel="noopener"><WhatsApp />Ask on WhatsApp</a>
              </Card3D>
            </Reveal>
          </div>
          <Reveal from="right"><Faq items={FAQ} /></Reveal>
        </div>
      </section>

      {/* ---------------- closer ---------------- */}
      <section className="sec sec--tight" aria-label="Contact Equity Classes">
        <div className="wrap">
          <Reveal from="zoom">
            <Card3D className="closer" depth={24} tilt={4} rest={{ x: 0, y: 0 }}>
              <div className="closer-logo"><Image src="/img/logo-round.png" alt={`Equity Classes logo: ${TAGLINE}`} width={150} height={150} /></div>
              <div className="closer-txt">
                <h2 className="h2"><span className="grad-txt">Creating a</span> <span className="gold-txt">Financial Ecosystem.</span></h2>
                <p>Unit 504, H Square Mall, Lalpur. Monday to Saturday, 10:30 AM to 7 PM.</p>
              </div>
              <div className="actions">
                <a className="btn btn--gold btn--shine" href={tel}><Phone />Call {D.PHONE_OFFICE_SHOW}</a>
                <a className="btn btn--glass" href={wa(HELLO)} target="_blank" rel="noopener"><WhatsApp />WhatsApp us</a>
              </div>
            </Card3D>
          </Reveal>
        </div>
      </section>
    </>
  );
}
