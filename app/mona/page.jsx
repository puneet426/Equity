import Image from "next/image";
import Link from "next/link";
import Card3D from "@/components/Card3D";
import { D } from "@/lib/site";
import { Phone, WhatsApp, Mail } from "@/components/Icons";

export const metadata = {
  title: "Mona Mohta, Founder & Director",
  description: "Contact Mona Mohta, Founder & Director of Equity Classes, Ranchi.",
  alternates: { canonical: "/mona" },
};

export default function Mona() {
  return (
    <div className="vcard-page">
      <Card3D className="vcard" depth={22} tilt={8} rest={{ x: 6, y: -8 }} scrollTilt={0}>
        <div className="vcard-top">
          <Link className="vcard-brand" href="/">EQUITY <span>CLASSES</span></Link>
          <h1 className="grad-txt"><small>Founder &amp; Director</small>Mona<br />Mohta</h1>
          <Image src="/img/team/mona-mohta.webp" alt="Portrait of Mona Mohta" width={260} height={260} quality={90} priority />
        </div>
        <a className="btn btn--gold btn--shine vcard-save" href="/mona-mohta.vcf" download="Mona_Mohta_Equity_Classes.vcf">Save to contacts</a>
        <nav className="vcard-links" aria-label="Contact Mona Mohta">
          <a href="tel:+917549114051"><Phone />Call</a>
          <a href="https://wa.me/917549114051" target="_blank" rel="noopener"><WhatsApp />WhatsApp</a>
          <a href={`mailto:${D.EMAIL}`}><Mail />Email</a>
        </nav>
        <dl className="facts">
          <div><dt>Mobile</dt><dd><a className="link" href="tel:+917549114051">+91 75491 14051</a></dd></div>
          <div><dt>Office</dt><dd><a className="link" href={`tel:${D.PHONE_OFFICE}`}>+91 92884 84448</a></dd></div>
          <div><dt>Email</dt><dd><a className="link" href={`mailto:${D.EMAIL}`}>{D.EMAIL}</a></dd></div>
          <div><dt>Address</dt><dd>504, H Square Building, opp. Pranami Heights, Lalpur, Ranchi 834001</dd></div>
        </dl>
        <p className="vcard-legal">{D.LEGAL}</p>
      </Card3D>
    </div>
  );
}
