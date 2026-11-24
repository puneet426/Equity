/* Velvet plum backdrop: slow drifting pools of gold and violet light, plus film grain. */
export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-pool bg-pool--gold" />
      <div className="bg-pool bg-pool--violet" />
      <div className="bg-pool bg-pool--rose" />
      <div className="bg-grain" />
      <div className="bg-vignette" />
    </div>
  );
}
