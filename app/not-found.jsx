import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <header className="phead phead--404">
      <div className="wrap">
        <p className="pill"><i className="pill-dot" />Error 404</p>
        <h1 className="h1"><span className="grad-txt">This page</span> <span className="gold-txt">doesn&apos;t balance.</span></h1>
        <p className="phead-p">The page you were looking for has moved or never existed. The courses, faculty and results are all still here.</p>
        <div className="actions">
          <Link className="btn btn--gold" href="/">Go to the home page</Link>
          <Link className="btn btn--glass" href="/results">See our results</Link>
        </div>
      </div>
    </header>
  );
}
