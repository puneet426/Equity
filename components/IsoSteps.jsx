/* Three isometric blocks rising left to right: the three levels of a course. */
const c30 = Math.cos(Math.PI / 6), s30 = Math.sin(Math.PI / 6), s = 46;
const P = (x, y, z) => [(x - y) * c30 * s, (x + y) * s30 * s - z * s];

export default function IsoSteps({ top, left, right, edge = "none" }) {
  const blocks = [0.9, 1.75, 2.6].map((h, i) => {
    const x0 = 0, x1 = 1.15, y0 = -(i + 1) * 1.15, y1 = -i * 1.15;
    return [
      [[[x0, y1, 0], [x1, y1, 0], [x1, y1, h], [x0, y1, h]], left],
      [[[x1, y0, 0], [x1, y1, 0], [x1, y1, h], [x1, y0, h]], right],
      [[[x0, y0, h], [x1, y0, h], [x1, y1, h], [x0, y1, h]], top],
    ];
  });
  const pts = blocks.flat().flatMap(([poly]) => poly.map((p) => P(...p)));
  const minx = Math.min(...pts.map((p) => p[0])), maxx = Math.max(...pts.map((p) => p[0]));
  const miny = Math.min(...pts.map((p) => p[1])), maxy = Math.max(...pts.map((p) => p[1]));
  const pad = 4, w = maxx - minx + 2 * pad, h = maxy - miny + 2 * pad;
  return (
    <svg className="iso" viewBox={`0 0 ${w.toFixed(0)} ${h.toFixed(0)}`} aria-hidden="true" focusable="false">
      {[...blocks].reverse().map((faces, bi) => (
        <g className="iso-blk" key={bi} style={{ "--i": 2 - bi }}>
          {faces.map(([poly, fill], fi) => (
            <polygon key={fi} fill={fill} stroke={edge} strokeWidth="1" strokeLinejoin="round"
              points={poly.map((p) => { const [x, y] = P(...p); return `${(x - minx + pad).toFixed(1)},${(y - miny + pad).toFixed(1)}`; }).join(" ")} />
          ))}
        </g>
      ))}
    </svg>
  );
}
