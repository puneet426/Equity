/* Endless horizontal strip. Content is rendered twice; CSS moves it by -50%. */
export default function Marquee({ children, reverse = false, speed = 40, className = "" }) {
  return (
    <div className={`marquee ${reverse ? "marquee--rev" : ""} ${className}`} style={{ "--dur": `${speed}s` }}>
      <div className="marquee-track">
        <div className="marquee-set">{children}</div>
        <div className="marquee-set" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
