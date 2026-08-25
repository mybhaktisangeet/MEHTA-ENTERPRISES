import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, y = 50, className, ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({ chapter, kicker, title, sub, light }) => (
  <Reveal className="sec-head">
    <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
      {chapter && <span className="chapter-num">/{chapter}</span>}
      <span className="kicker">{kicker}</span>
    </div>
    <h2 className="sec-title" style={light ? { color: "#fff" } : undefined}>{title}</h2>
    {sub && <p className="sec-sub">{sub}</p>}
  </Reveal>
);

export const CTALink = ({ to, primary, children, testid }) => (
  <Link to={to} className={`btn ${primary ? "btn-primary" : "btn-ghost"}`} data-testid={testid}>
    {children}
  </Link>
);

export const AnimatedCounter = ({ to, suffix = "", duration = 2.4 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration, ease: EASE, onUpdate: (v) => setVal(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
};

export const PageHero = ({ title, kicker, sub, img }) => (
  <header className="page-hero grain">
    <div className="ph-bg" style={{ backgroundImage: `url(${img})` }} />
    <div className="ph-overlay" />
    <div className="container ph-content">
      <motion.span className="kicker" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        {kicker}
      </motion.span>
      <div style={{ overflow: "hidden" }}>
        <motion.h1 initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
          {title}
        </motion.h1>
      </div>
      {sub && (
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: EASE }}>
          {sub}
        </motion.p>
      )}
    </div>
  </header>
);

export const PageWrap = ({ children, testid }) => (
  <motion.main
    data-testid={testid}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: EASE }}
  >
    {children}
  </motion.main>
);

export const SparkCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    let raf, w, h;
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const sparks = Array.from({ length: 46 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.3) * 0.0004, vy: -(Math.random() * 0.0008 + 0.0002),
      a: Math.random() * 0.6 + 0.15, hue: Math.random() > 0.5 ? "251,146,60" : "220,38,38",
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      sparks.forEach((s) => {
        s.x += s.vx; s.y += s.vy;
        if (s.y < -0.05) { s.y = 1.05; s.x = Math.random(); }
        if (s.x < -0.05 || s.x > 1.05) s.x = Math.random();
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue},${s.a})`;
        ctx.shadowColor = `rgba(${s.hue},0.8)`;
        ctx.shadowBlur = 6;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="spark-canvas" aria-hidden="true" />;
};

export const EditorialMarquee = ({ items, speed = "60s" }) => {
  const row = items.join("  ·  ");
  return (
    <div className="edit-marquee marquee" style={{ "--marquee-speed": speed }} aria-hidden="true">
      <div className="marquee-track">
        <span className="ghost-text em-text">{row}&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        <span className="ghost-text em-text">{row}&nbsp;&nbsp;·&nbsp;&nbsp;</span>
      </div>
    </div>
  );
};

export const playStamp = () => {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const og = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(130, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    og.gain.setValueAtTime(0.16, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(og).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.22);
    const len = Math.floor(ctx.sampleRate * 0.06);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2700;
    bp.Q.value = 6;
    const ng = ctx.createGain();
    ng.gain.value = 0.1;
    src.connect(bp).connect(ng).connect(ctx.destination);
    src.start(t);
    setTimeout(() => ctx.close(), 450);
  } catch {}
  if (navigator.vibrate) navigator.vibrate(18);
};

export const StampCTA = ({ to, primary, children, testid }) => {
  const navigate = useNavigate();
  const [stamping, setStamping] = useState(false);
  const onClick = (e) => {
    e.preventDefault();
    if (stamping) return;
    setStamping(true);
    playStamp();
    setTimeout(() => navigate(to), 340);
  };
  return (
    <span className="stamp-wrap">
      <a href={to} onClick={onClick} className={`btn ${primary ? "btn-primary" : "btn-ghost"} stamp-btn ${stamping ? "stamping" : ""}`} data-testid={testid}>
        {children}
      </a>
      {stamping && (
        <span className="stamp-sparks" aria-hidden="true">
          {[...Array(8)].map((_, i) => <i key={i} style={{ "--a": `${i * 45}deg` }} />)}
        </span>
      )}
    </span>
  );
};
