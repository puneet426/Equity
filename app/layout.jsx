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

/* Share previews must load from the domain the site is served on: Vercel's production
   domain (or the custom domain once it is added there), the branch URL on previews. */
const HOST = process.env.VERCEL_ENV === "production" ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
const BASE = HOST ? `https://${HOST}` : "http://localhost:3000";
const OG = { url: "/og.jpg", width: 1200, height: 630, alt: "Equity Classes, Ranchi: the 3D E book logo with the line Become a CA. Or a CS. Start in Ranchi." };

export const metadata = {
  metadataBase: new URL(BASE),
  title: { default: "Equity Classes | CA & CS Coaching in Lalpur, Ranchi", template: "%s | Equity Classes, Ranchi" },
  description: desc,
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/favicon.png", type: "image/png" }], apple: "/apple-touch-icon.png" },
  openGraph: { type: "website", siteName: "Equity Classes", locale: "en_IN", images: [OG], description: desc },
  twitter: { card: "summary_large_image", images: [OG] },
  verification: { google: "fe1k1809DCJAvYMaVQtzkn2bsossO2tuWfnR9foXoaM" },
};

export const viewport = { themeColor: "#16011f", width: "device-width", initialScale: 1, viewportFit: "cover", colorScheme: "dark light" };

const orgLd = {
  "@context": "https://schema.org", "@type": "EducationalOrganization", name: "Equity Classes", url: D.SITE + "/",
  slogan: TAGLINE, telephone: D.PHONE_OFFICE, email: D.EMAIL, image: BASE + "/og.jpg",
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
