import { useEffect, useRef } from "react";
import { CheckCircle2, Handshake, Eye, ShieldCheck, Lightbulb, Target } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal, SectionHeading, PageHero, PageWrap } from "../components/Shared";
import { IMG, VALUES, MILESTONES, CHAIRMAN_MSG } from "../data/content";

const VALUE_ICONS = [Handshake, ShieldCheck, Eye, Target, Lightbulb];

const STORY_POINTS = [
  "A reputed and respected name in the niche of sheet metal manufacturing in Pune",
  "Specialists in high-precision sheet metal press components and weld assemblies",
  "Every design is sturdy, foolproof, and robust",
  "Specialized processes: welding, spotting, and projection",
  "Customer satisfaction is our first priority",
  "Holistic approach — we involve clients in product development from day one",
];

const VisionMission = () => (
  <section className="section" id="vision" data-testid="vision-mission-section">
    <div className="container">
      <SectionHeading kicker="Vision · Mission · Values" title="What drives us forward" />
      <Reveal>
        <div className="vision-card">
          <small>Our Vision</small>
          "To be the most trusted name in the field of sheet metal components and welded assemblies in India."
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mission-block">
          <strong style={{ color: "var(--color-metal-100)" }}>Our Mission — </strong>
          We aim to delight our customers by offering quality products at competitive prices. We remain the most-preferred manufacturing partner by giving utmost emphasis on innovation, product design excellence, and continuous quality improvement.
        </p>
      </Reveal>
      <div className="values-grid">
        {VALUES.map((v, i) => {
          const Icon = VALUE_ICONS[i];
          return (
            <Reveal key={v.title} delay={i * 0.08} className="value-card glass-card" data-testid={`value-card-${v.title.toLowerCase()}`}>
              <Icon size={22} />
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

const Story = () => (
  <section className="section section-alt" id="story" data-testid="company-story-section">
    <div className="container story-grid">
      <Reveal>
        <div className="img-frame">
          <img src={IMG.galleryFloor} alt="Mehta Enterprises factory floor" loading="lazy" />
          <span className="frame-tag">Factory Floor · MIDC Bhosari</span>
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <span className="kicker">Company Overview</span>
        <h2 className="sec-title">A one-of-a-kind<br />engineering story</h2>
        <p style={{ marginTop: "var(--space-lg)", color: "var(--color-metal-300)" }}>
          Our objective is simple: deliver products that surpass expectations. With a team of enthusiastic and energetic engineers, we treat every component — from the smallest bracket to a complex welded assembly — as a critical block of the vehicle it serves.
        </p>
        <div className="story-points">
          {STORY_POINTS.map((p) => (
            <div className="story-point" key={p}><CheckCircle2 size={16} /><span>{p}</span></div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

const Leadership = () => (
  <section className="section" id="leadership" data-testid="leadership-section">
    <div className="container">
      <SectionHeading kicker="Leadership Team" title="Two generations of engineering" />
      <div className="lead-grid">
        <Reveal className="lead-card glass-card" data-testid="chairman-bio-card">
          <div className="lead-photo"><img src={IMG.chairman} alt="Mr. Nitin H. Mehta — Chairman and Founder" loading="lazy" /></div>
          <div className="lead-body">
            <h3>Mr. Nitin H. Mehta</h3>
            <span className="lead-role">Chairman & Founder</span>
            <p>Mechanical Engineering graduate from Manipal Institute of Technology with 35+ years in the automotive sheet metal industry. Former Tool Design Engineer at Force Motors (erstwhile Bajaj Tempo); worked with Tata Motors and FIAT India.</p>
            <p>Built the company from a small workshop in 1986 to a multi-company group serving global OEMs, supplying components to Fiat Italy in the 0.50mm to 10mm raw material range.</p>
            <div className="lead-achv">
              <span>280+ components — Tata Motors</span>
              <span>80+ components — Fiat India</span>
              <span>60+ components — Force Motors</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="lead-card glass-card" data-testid="director-bio-card">
          <div className="lead-photo"><img src={IMG.director} alt="Mr. Sagar Mehta — Director" loading="lazy" /></div>
          <div className="lead-body">
            <h3>Mr. Sagar Mehta</h3>
            <span className="lead-role">Director</span>
            <p>Mechanical Engineering degree with a Post-Graduate qualification in Management (Finance and Operations).</p>
            <p>Second-generation leadership driving modernization, quality systems, and international expansion — from robotic welding cells to IATF 16949-grade quality processes across all three group companies.</p>
            <div className="lead-achv">
              <span>Modernization</span>
              <span>Quality Systems</span>
              <span>Global Expansion</span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const ChairmansMessage = () => (
  <section className="section section-alt" id="message" data-testid="chairman-message-section">
    <div className="container chair-msg">
      <Reveal>
        <div className="img-frame chair-photo">
          <img src={IMG.chairman} alt="Mr. Nitin H. Mehta" loading="lazy" />
        </div>
      </Reveal>
      <Reveal delay={0.12} className="chair-quote">
        <span className="kicker">Chairman's Message</span>
        <span className="qmark" aria-hidden="true">"</span>
        <blockquote>{CHAIRMAN_MSG}</blockquote>
        <div className="chair-sign">
          <strong>Nitin H. Mehta</strong>
          <span>Chairman & Founder, Mehta Enterprise Group</span>
        </div>
      </Reveal>
    </div>
  </section>
);

const Timeline = () => {
  const lineRef = useRef(null);
  const wrapRef = useRef(null);
  useEffect(() => {
    if (!lineRef.current || !wrapRef.current) return;
    const tween = gsap.fromTo(lineRef.current, { height: "0%" }, {
      height: "100%", ease: "none",
      scrollTrigger: { trigger: wrapRef.current, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return (
    <section className="section" id="timeline" data-testid="timeline-section">
      <div className="container">
        <SectionHeading kicker="Company Milestones" title={<>Four decades, <span className="accent">forged year by year</span></>} sub="From a single plot in MIDC Bhosari to a multi-facility group supplying OEMs across three continents." />
        <div className="timeline" ref={wrapRef}>
          <div className="tl-line"><div className="tl-progress" ref={lineRef} /></div>
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year + m.text} delay={0.04 * (i % 4)} y={30} className="tl-item" data-testid={`milestone-${m.year}`}>
              <span className="tl-dot" />
              <div className="tl-year mono">{m.year}</div>
              <p className="tl-text">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function About() {
  return (
    <PageWrap testid="about-page">
      <PageHero title="About Mehta Enterprises" kicker="The Group · Est. 1986" sub="Three companies, one obsession — precision sheet metal manufacturing that global OEMs stake their lines on." img={IMG.aboutWorkers} />
      <VisionMission />
      <Story />
      <Leadership />
      <ChairmansMessage />
      <Timeline />
    </PageWrap>
  );
}
