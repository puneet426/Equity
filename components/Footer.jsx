import Link from "next/link";
import Image from "next/image";
import { D, TAGLINE, HELLO, wa, tel } from "@/lib/site";
import { Instagram, WhatsApp, Linktree, MapPin, Mail, Phone } from "./Icons";

const SOCIALS = [
  { label: "Instagram", sub: "@equityclasses", href: D.INSTAGRAM, Icon: Instagram },
  { label: "WhatsApp", sub: "87978 34974", href: `https://wa.me/${D.WA_ENQUIRY}`, Icon: WhatsApp },
  { label: "Call", sub: D.PHONE_OFFICE_SHOW, href: tel, Icon: Phone, self: true },
  { label: "Email", sub: "Write to us", href: `mailto:${D.EMAIL}`, Icon: Mail, self: true },
  { label: "Google Maps", sub: "H Square Mall", href: D.MAP_LINK, Icon: MapPin },
  { label: "Linktree", sub: "All our links", href: D.LINKTREE, Icon: Linktree },
];

export default function Footer() {
  return (
    <>
      <footer className="ftr">
        <div className="ftr-glow" aria-hidden="true" />
        <div className="wrap">
          <div className="ftr-top">
            <div className="ftr-brand">
              <Image src="/img/logo-round.png" alt={`Equity Classes logo: ${TAGLINE}`} width={88} height={88} className="ftr-logo" />
              <div>
                <p className="ftr-word">EQUITY <span>CLASSES</span></p>
                <p className="ftr-tag">{TAGLINE}</p>
              </div>
            </div>
            <a className="btn btn--gold" href={wa(HELLO)} target="_blank" rel="noopener"><WhatsApp />Ask about the next batch</a>
          </div>

          <ul className="socials" aria-label="Find Equity Classes online">
            {SOCIALS.map(({ label, sub, href, Icon, self }) => (
              <li key={label}>
                <a className="social" href={href} aria-label={`${label}: ${sub}`} title={label} {...(self ? {} : { target: "_blank", rel: "noopener" })}>
                  <Icon />
                </a>
              </li>
            ))}
          </ul>

          <div className="ftr-cols">
            <div>
              <h2>Visit</h2>
              <p>{D.ADDRESS_1}<br />{D.ADDRESS_2}<br />{D.ADDRESS_NOTE}</p>
            </div>
            <div>
              <h2>Hours</h2>
              <p>{D.HOURS}<br />Closed on Sunday</p>
            </div>
            <div>
              <h2>Explore</h2>
              <ul>
                <li><Link href="/#courses">Courses</Link></li>
                <li><Link href="/#faculty">Faculty</Link></li>
                <li><Link href="/results">All achievers</Link></li>
                <li><Link href="/#reviews">Reviews</Link></li>
                <li><Link href="/#faq">Questions</Link></li>
                <li><Link href="/contact">Contact and enquiry</Link></li>
              </ul>
            </div>
            <div>
              <h2>Contact</h2>
              <ul>
                <li><a href={tel}>{D.PHONE_OFFICE_SHOW}</a></li>
                <li><a href={`mailto:${D.EMAIL}`}>{D.EMAIL}</a></li>
                <li><Link href="/mona">Mona Mohta, Director</Link></li>
              </ul>
            </div>
          </div>

          <p className="ftr-giant" aria-hidden="true">EQUITY</p>

          <div className="ftr-base">
            <span>© {new Date().getFullYear()} Equity Edutech Pvt. Ltd. {D.LEGAL.replace("A unit of Equity Edutech Pvt. Ltd.", "")}</span>
            <span className="ftr-eq">Assets = Liabilities + <b>Equity</b></span>
          </div>
        </div>
      </footer>

      <nav className="actbar" aria-label="Quick contact">
        <a href={tel}><Phone />Call</a>
        <a href={wa(HELLO)} target="_blank" rel="noopener"><WhatsApp />WhatsApp</a>
      </nav>
    </>
  );
}
