import { useEffect, useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { motion } from "framer-motion";

const W = 980;
const H = 470;
const PUNE = [73.85, 18.52];
const DEST = [
  { name: "Germany · Mercedes-Benz", c: [9.18, 48.78], lx: 10, ly: -8 },
  { name: "France · PSA Groupe", c: [2.35, 48.85], lx: -10, ly: 14, anchor: "end" },
  { name: "Belgium · Tyco Electronics", c: [4.35, 50.85], lx: -10, ly: -10, anchor: "end" },
  { name: "Italy · FCA & Iveco", c: [12.5, 41.9], lx: 10, ly: 12 },
  { name: "South Africa · FCA", c: [28.0, -26.2], lx: 10, ly: 4 },
  { name: "Colombia · General Motors", c: [-74.1, 4.7], lx: 10, ly: 4 },
  { name: "South Korea · General Motors", c: [127.0, 37.55], lx: 10, ly: 4 },
];

export const WorldMap = () => {
  const [land, setLand] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/land-110m.json`)
      .then((r) => r.json())
      .then((topo) => setLand(feature(topo, topo.objects.land)))
      .catch(() => {});
  }, []);

  const geo = useMemo(() => {
    if (!land) return null;
    const proj = geoNaturalEarth1().fitExtent([[8, 8], [W - 8, H - 8]], land);
    return {
      landPath: geoPath(proj)(land),
      pune: proj(PUNE),
      points: DEST.map((d) => ({ ...d, xy: proj(d.c) })),
    };
  }, [land]);

  if (!geo) return <div className="world-map-wrap" data-testid="client-world-map" />;

  const [px, py] = geo.pune;
  const arc = ([x, y]) => {
    const mx = (px + x) / 2;
    const lift = Math.hypot(x - px, y - py) * 0.22;
    return `M ${px} ${py} Q ${mx} ${Math.min(py, y) - lift} ${x} ${y}`;
  };

  return (
    <div className="world-map-wrap" data-testid="client-world-map">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="World map showing shipments from Pune to international clients">
        <path className="map-land" d={geo.landPath} />
        {geo.points.map((p, i) => (
          <motion.path
            key={p.name}
            className="map-arc"
            d={arc(p.xy)}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.75 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.5, delay: 0.3 + i * 0.18, ease: "easeInOut" }}
          />
        ))}
        {geo.points.map((p, i) => (
          <motion.g
            key={p.name}
            className="map-pin"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.35 + i * 0.18, type: "spring", stiffness: 200 }}
            data-testid={`map-pin-${i + 1}`}
          >
            <circle className="pin-pulse" cx={p.xy[0]} cy={p.xy[1]} r={6} style={{ animationDelay: `${i * 0.3}s` }} />
            <circle className="pin-core" cx={p.xy[0]} cy={p.xy[1]} r={4} />
            <text className="map-label" x={p.xy[0] + p.lx} y={p.xy[1] + p.ly} textAnchor={p.anchor || "start"}>{p.name}</text>
          </motion.g>
        ))}
        <motion.g
          className="map-pin hub"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 180 }}
          data-testid="map-pin-pune"
        >
          <circle className="pin-pulse" cx={px} cy={py} r={8} />
          <circle className="pin-core" cx={px} cy={py} r={5.5} />
          <text className="map-label" x={px + 12} y={py + 16}>Pune · HQ</text>
        </motion.g>
      </svg>
      <span className="map-hint">Hover pins for client details</span>
    </div>
  );
};
