import Reveal from "./Reveal";

export default function SectionHead({ kicker, title, thin, children, id, center }) {
  return (
    <Reveal className={`shead${center ? " shead--c" : ""}`}>
      <div>
        <p className="pill"><i className="pill-dot" />{kicker}</p>
        <h2 id={id} className="h2"><span className="grad-txt">{title}</span>{thin && <> <span className="grad-txt thin">{thin}</span></>}</h2>
      </div>
      {children && <p className="shead-p">{children}</p>}
    </Reveal>
  );
}
