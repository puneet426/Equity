import Link from "next/link";
import Card3D from "@/components/Card3D";
import Reveal, { RevealItem } from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { WhatsApp, Phone, MapPin, Mail, Instagram } from "@/components/Icons";
import { D, HELLO, wa, tel } from "@/lib/site";

export const metadata = {
  title: "Contact & Enquiry",
  description: `Ask about the next CA or CS batch at Equity Classes, H Square Mall, Lalpur, Ranchi. Call ${D.PHONE_OFFICE_SHOW} or send a WhatsApp enquiry.`,
  alternates: { canonical: "/contact" },
};

const WAYS = [
  { Icon: Phone, k: "Call the front desk", v: D.PHONE_OFFICE_SHOW, href: tel, note: "Fastest during office hours" },
  { Icon: WhatsApp, k: "WhatsApp", v: "87978 34974", href: wa(HELLO), note: "Replies Mon to Sat", ext: true },
  { Icon: Mail, k: "Email", v: D.EMAIL, href: `mailto:${D.EMAIL}`, note: "For documents and fee sheets" },
  { Icon: Instagram, k: "Instagram", v: "@equityclasses", href: D.INSTAGRAM, note: "Results and class updates", ext: true },
];

export default function Contact() {
  return (
    <>
      <header className="phead phead--contact">
        <div className="wrap">
          <p className="crumb"><Link href="/">Home</Link><span aria-hidden="true">/</span>Contact</p>
          <h1 className="h1"><span className="grad-txt">Let&apos;s find</span> <span className="gold-txt">your batch.</span></h1>
          <p className="phead-p">Tell us where you are in your CA or CS journey. Counselling is free, and we will share fees and start dates on WhatsApp.</p>
        </div>
      </header>

      <section className="wrap" aria-label="Enquiry form">
        <Reveal from="up">
          <Card3D className="form-card form-card--wide" depth={16} tilt={1.5} scrollTilt={2}>
            <EnquiryForm withPreview />
          </Card3D>
        </Reveal>
      </section>

      <section className="sec" aria-labelledby="ways-title">
        <div className="wrap">
          <h2 id="ways-title" className="h3 grad-txt" style={{ marginBottom: "1.4rem" }}>Other ways to reach us</h2>
          <Reveal className="ways" stagger={0.08}>
            {WAYS.map(({ Icon, k, v, href, note, ext }) => (
              <RevealItem key={k} from="flip">
                <Card3D href={href} external={ext} className="way" depth={12} tilt={10}>
                  <span className="point-ico"><Icon /></span>
                  <small>{k}</small>
                  <b>{v}</b>
                  <span>{note}</span>
                </Card3D>
              </RevealItem>
            ))}
          </Reveal>

          <div className="visit-band">
            <Reveal from="left" className="visit-info">
              <span className="point-ico"><MapPin /></span>
              <h3 className="h3 grad-txt">Visit the institute</h3>
              <p>{D.ADDRESS_1},<br />{D.ADDRESS_2}. {D.ADDRESS_NOTE}.</p>
              <p className="hours"><i className="pill-dot" />{D.HOURS}. Closed Sunday.</p>
              <a className="btn btn--glass" href={D.MAP_LINK} target="_blank" rel="noopener"><MapPin />Directions in Google Maps</a>
            </Reveal>
            <Reveal from="right" className="map-wrap">
              <iframe className="map map--tall" src={D.MAP_EMBED} title="Map: Equity Classes, H Square Mall, Lalpur, Ranchi" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
