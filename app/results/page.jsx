import Link from "next/link";
import ResultsGrid from "@/components/ResultsGrid";
import { D, nCA, nCS } from "@/lib/site";

export const metadata = {
  title: "Results & Achievers",
  description: `${D.achievers.length} CA and CS achievers from Equity Classes, Ranchi, including State Topper Rudra Raj Dawn (CA Foundation).`,
  alternates: { canonical: "/results" },
};

export default function Results() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <p className="crumb"><Link href="/">Home</Link><span aria-hidden="true">/</span>Results</p>
          <h1 className="h1"><span className="grad-txt">Our</span> <span className="gold-txt">achievers</span></h1>
          <p className="phead-p">{D.achievers.length} Equity Classes students who cleared their CA or CS exams: {nCA} in CA and {nCS} in CS. Rudra Raj Dawn topped the state in CA Foundation.</p>
        </div>
      </header>
      <section className="wrap" style={{ paddingBottom: "5rem" }}>
        <ResultsGrid people={D.achievers} />
      </section>
    </>
  );
}
