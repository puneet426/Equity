import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Card3D from "@/components/Card3D";
import Reveal from "@/components/Reveal";
import { WhatsApp, LinkedIn } from "@/components/Icons";
import { D, facultyById, firstName, wa } from "@/lib/site";

export function generateStaticParams() {
  return D.faculty.map((f) => ({ id: f.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const f = facultyById[id];
  if (!f) return {};
  return {
    title: `${f.name}, ${f.role}`,
    description: `${f.name} teaches ${f.expertise} at Equity Classes, Lalpur, Ranchi.`,
    alternates: { canonical: `/faculty/${f.id}` },
    openGraph: { images: [`/img/team/${f.id}.webp`] },
  };
}

export default async function Faculty({ params }) {
  const { id } = await params;
  const f = facultyById[id];
  if (!f) notFound();
  const facts = [
    f.qualifications && ["Qualified", f.qualifications],
    f.experience && ["Experience", f.experience],
    ["Teaches", f.expertise],
    f.level && ["Level", f.level],
  ].filter(Boolean);
  const ld = {
    "@context": "https://schema.org", "@type": "Person", name: f.name, jobTitle: f.role, image: `${D.SITE}/img/team/${f.id}.webp`,
    knowsAbout: f.expertise, worksFor: { "@type": "EducationalOrganization", name: "Equity Classes", url: D.SITE + "/" },
    ...(f.linkedin ? { sameAs: [f.linkedin] } : {}),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap profile">
        <Reveal from="left" className="profile-photo">
          <p className="crumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/#faculty">Faculty</Link></p>
          <Card3D className="portrait" depth={22} tilt={10} rest={{ x: 4, y: 12 }} scrollTilt={0}>
            <Image src={`/img/team/${f.id}.webp`} alt={`Portrait of ${f.name}`} width={800} height={800} quality={90} priority sizes="(max-width: 860px) 90vw, 420px" />
          </Card3D>
        </Reveal>
        <Reveal from="right" delay={0.1}>
          <span className="role">{f.role} · Equity Classes</span>
          <h1 className="h1 profile-name grad-txt">{f.name}</h1>
          <p className="bio">{f.bio}</p>
          <dl className="facts">
            {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <div className="actions">
            <a className="btn btn--gold btn--shine" href={wa(`Hello Equity Classes, I would like to know about classes with ${f.name}.`)} target="_blank" rel="noopener">
              <WhatsApp />Ask about {firstName(f.name)}&apos;s classes
            </a>
            {f.linkedin && <a className="btn btn--glass" href={f.linkedin} target="_blank" rel="noopener"><LinkedIn />LinkedIn</a>}
          </div>
        </Reveal>
      </div>
      <section className="wrap" style={{ paddingBottom: "5rem" }} aria-labelledby="others">
        <h2 id="others" className="h3 grad-txt" style={{ marginBottom: "1.4rem" }}>Other faculty</h2>
        <div className="roster">
          {D.faculty.filter((o) => o.id !== f.id).map((o) => (
            <Card3D key={o.id} href={`/faculty/${o.id}`} className="mate" depth={10} tilt={10}>
              <Image src={`/img/team/${o.id}.webp`} alt="" width={160} height={160} quality={90} />
              <b>{o.name}</b><span>{o.expertise}</span>
            </Card3D>
          ))}
        </div>
      </section>
    </>
  );
}
