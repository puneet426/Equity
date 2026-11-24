import { Montserrat, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import "./extras.css";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { D, TAGLINE } from "@/lib/site";

const display = Montserrat({ subsets: ["latin"], weight: ["300", "500", "600", "700", "800", "900"], variable: "--f-display", display: "swap" });
const body = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--f-body", display: "swap" });

const desc = `CA Foundation, Intermediate and Final, and CSEET, CS Executive and Professional coaching in H Square Mall, Lalpur, Ranchi. ${D.GOOGLE_RATING} on Google from ${D.GOOGLE_REVIEWS} reviews.`;

export const metadata = {
  metadataBase: new URL(D.SITE),
  title: { default: "Equity Classes | CA & CS Coaching in Lalpur, Ranchi", template: "%s | Equity Classes, Ranchi" },
  description: desc,
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/favicon.png", type: "image/png" }], apple: "/apple-touch-icon.png" },
  openGraph: { type: "website", siteName: "Equity Classes", locale: "en_IN", images: ["/og.jpg"], description: desc },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  verification: { google: "fe1k1809DCJAvYMaVQtzkn2bsossO2tuWfnR9foXoaM" },
};

export const viewport = { themeColor: "#16011f", width: "device-width", initialScale: 1, viewportFit: "cover", colorScheme: "dark light" };

const orgLd = {
  "@context": "https://schema.org", "@type": "EducationalOrganization", name: "Equity Classes", url: D.SITE + "/",
  slogan: TAGLINE, telephone: D.PHONE_OFFICE, email: D.EMAIL, image: D.SITE + "/og.jpg",
  address: { "@type": "PostalAddress", streetAddress: D.ADDRESS_1, addressLocality: "Ranchi", addressRegion: "Jharkhand", postalCode: "834001", addressCountry: "IN" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: D.GOOGLE_RATING, reviewCount: D.GOOGLE_REVIEWS },
  sameAs: [D.INSTAGRAM, D.LINKTREE],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}` }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <a className="skip" href="#main">Skip to content</a>
        <Background />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
