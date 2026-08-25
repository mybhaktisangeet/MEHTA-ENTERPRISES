import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Workflow, TrendingDown, Search, Truck, Trophy, ShieldCheck, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SectionHeading, CTALink, AnimatedCounter, SparkCanvas, EditorialMarquee, PageWrap, EASE } from "../components/Shared";
import { IMG, TRUSTED_CLIENTS, WHY_US, AWARDS, CERTS, DOMESTIC_CLIENTS, INTL_CLIENTS, COMPANY } from "../data/content";

const ICONS = { Workflow, TrendingDown, Search, Truck };
const HERO_LINES = [
  { text: "Precision-Engineered", accent: false },
  { text: "Sheet Metal", accent: true },
  { text: "Solutions.", accent: false },
];

const Hero = () => (
  <section className="hero grain" data-testid="home-hero">
    <div className="hero-bg" style={{ backgroundImage: `url(${IMG.heroPress})` }} />
    <div className="hero-overlay" />
    <SparkCanvas />
    <div className="container-wide hero-content">
      <motion.div className="hero-kicker-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
        <span className="kicker">Since 1986 · MIDC Bhosari · Pune, India</span>
      </motion.div>
      <h1 className="hero-title" data-testid="hero-headline">
        {HERO_LINES.map((line, i) => (
          <span className="hero-line" key={line.text}>
            <motion.span
              className={line.accent ? "fill-accent" : ""}
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.35 + i * 0.14, ease: EASE }}
            >
              {line.text}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.p className="hero-sub" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.05, ease: EASE }}>
        Trusted by <strong>Tata Motors, General Motors, Mercedes-Benz, Cummins and FCA</strong> for 38+ years — high-precision press components and welded assemblies, forged in Pune and shipped across the world.
      </motion.p>
      <motion.div className="hero-ctas" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.25, ease: EASE }}>
        <CTALink to="/products" primary testid="hero-cta-products">Explore Our Products <ArrowRight size={16} /></CTALink>
        <CTALink to="/contact" testid="hero-cta-quote">Request a Quote</CTALink>
      </motion.div>
    </div>
    <div className="hero-ghost ghost-text" aria-hidden="true">FORGED</div>
    <div className="hero-meta">
      <strong>IATF 16949 · BUREAU VERITAS</strong>
      <span>0.50MM – 10MM RAW MATERIAL RANGE</span>
      <span>30T – 400T PRESS CAPACITY</span>
    </div>
    <div className="hero-scroll" data-testid="hero-scroll-indicator">
      <span>Scroll</span>
      <ChevronDown size={16} />
    </div>
  </section>
);

const TrustedBar = () => (
  <section className="trust-bar" data-testid="trusted-by-bar">
    <p className="tb-label">Trusted by Global Automotive Leaders</p>
    <div className="marquee" style={{ "--marquee-speed": "42s" }}>
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <span key={dup} aria-hidden={dup === 1}>
            {TRUSTED_CLIENTS.map((c) => (
              <span className="tb-item" key={`${dup}-${c}`}>{c}<span className="tb-dot" /></span>
            ))}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const STATS = [
  { to: 38, suffix: "+", label: "Years of Excellence" },
  { to: 420, suffix: "+", label: "Components Developed" },
  { to: 15, suffix: "+", label: "Global OEM Clients" },
  { to: 3, suffix: "", label: "Manufacturing Facilities" },
];

const Intro = () => (
  <section className="section" data-testid="company-intro-section">
    <div className="container">
      <div className="intro-grid">
        <motion.div className="intro-text" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease: EASE }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span className="chapter-num">/01</span>
            <span className="kicker">Our Background</span>
          </div>
          <h2 className="sec-title">Engineered in Pune.<br /><span className="accent">Trusted Worldwide.</span></h2>
          <p style={{ marginTop: "var(--space-lg)" }}>
            Welcome to Mehta Enterprises, a dedicated sheet metal manufacturing organisation in the bustling city of Pune, India. Our specialties are in design and manufacturing high-precision sheet metal press components and welded assemblies.
          </p>
          <p>
            We are an enthusiastic team of young and motivated mechanical engineers, always ready for challenges. We create powerful, foolproof, sturdy and robust designs by using state-of-the-art equipment, and engage in specialized processes like welding, projection, and spotting. From engine parts to vehicle-level fitment parts, we cater to every sheet metal requirement of the automobile segment.
          </p>
          <CTALink to="/about" testid="intro-about-cta">About the Group <ArrowRight size={15} /></CTALink>
        </motion.div>
        <motion.div className="intro-img" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease: EASE }}>
          <div className="img-frame">
            <img src={IMG.aboutWorkers} alt="Mehta Enterprises engineers reviewing blueprints" loading="lazy" />
            <span className="frame-tag">Engineering Review · Unit J-383</span>
          </div>
          <div className="intro-img-badge">
            <strong>1986</strong>
            <span>Est. MIDC Bhosari</span>
          </div>
        </motion.div>
      </div>
      <div className="stats-row" data-testid="stats-counter-row">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="stat">
            <div className="stat-num"><AnimatedCounter to={s.to} suffix={s.suffix} /></div>
            <div className="stat-label">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const WhyUs = () => (
  <section className="section section-alt" data-testid="why-choose-us-section">
    <div className="container">
      <SectionHeading chapter="02" kicker="Why Choose Us" title={<>Built on process.<br />Proven by partnership.</>} />
      <div className="why-grid">
        {WHY_US.map((w, i) => {
          const Icon = ICONS[w.icon];
          return (
            <Reveal key={w.title} delay={i * 0.12} className="why-card glass-card" data-testid={`why-card-${i}`}>
              <span className="why-num">0{i + 1}</span>
              <div className="why-icon"><Icon size={24} /></div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

const Awards = () => (
  <section className="section" data-testid="awards-showcase-section">
    <div className="container">
      <SectionHeading chapter="03" kicker="Awards & Certifications" title={<>Recognised by the <span className="accent">best in the business.</span></>} sub="IATF 16949 certified by Bureau Veritas, with supplier excellence awards from Cummins and General Motors." />
    </div>
    <div className="container">
      <div className="awards-row">
        {CERTS.map((c, i) => (
          <motion.div key={i} className="award-card glass-card" initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}>
            <div className="award-icon"><ShieldCheck size={30} /></div>
            <span className="award-year">CERTIFIED</span>
            <h3>{c.title}</h3>
            <p>{c.by}</p>
            <span className="cert-chip">{c.entity}</span>
          </motion.div>
        ))}
        {AWARDS.map((a, i) => (
          <motion.div key={a.title} className="award-card glass-card" initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: (i + 2) * 0.1, ease: EASE }}>
            <div className="award-icon"><Trophy size={30} /></div>
            <span className="award-year">{a.year}</span>
            <h3>{a.title}</h3>
            <p>Presented by {a.by}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const INFRA_TILES = [
  { img: IMG.pressShop, tag: "Press Shop", cls: "wide" },
  { img: IMG.welding, tag: "Welding Shop", cls: "tall" },
  { img: IMG.toolRoom, tag: "Tool Room", cls: "" },
  { img: IMG.qualityLab, tag: "Quality Lab", cls: "" },
  { img: IMG.storage, tag: "Storage & Logistics", cls: "" },
  { img: IMG.galleryFloor, tag: "Factory Floor", cls: "wide" },
];

const InfraPreview = () => (
  <section className="section section-alt" data-testid="infrastructure-preview-section">
    <div className="container">
      <SectionHeading chapter="04" kicker="Our Infrastructure" title="Three units. One standard." sub="State-of-the-art manufacturing facilities across 3 units in MIDC Bhosari, Pune — presses from 30 to 400 tons, robotic welding cells and a CMM-equipped quality lab." />
      <div className="infra-grid">
        {INFRA_TILES.map((t, i) => (
          <Reveal key={t.tag} delay={i * 0.08} className={`infra-tile ${t.cls}`}>
            <div className="img-frame" style={{ height: "100%" }}>
              <img src={t.img} alt={t.tag} loading="lazy" />
              <span className="frame-tag">{t.tag}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2} style={{ marginTop: "var(--space-2xl)" }}>
        <CTALink to="/infrastructure" primary testid="infra-explore-cta">Explore Full Infrastructure <ArrowRight size={16} /></CTALink>
      </Reveal>
    </div>
  </section>
);

const Customers = () => (
  <section className="section customers-section" data-testid="happy-customers-section">
    <div className="cust-bg" style={{ backgroundImage: `url(${IMG.galleryFloor})` }} />
    <div className="container" style={{ position: "relative", zIndex: 2 }}>
      <SectionHeading chapter="05" kicker="Our Happy Customers" title={<>Partnerships measured <span className="accent">in decades.</span></>} />
      <div className="cust-grid">
        {[...DOMESTIC_CLIENTS.slice(0, 4), ...INTL_CLIENTS.slice(0, 4)].map((c, i) => (
          <Reveal key={c.name + i} delay={i * 0.07} className="cust-card glass-card">
            <span className="cust-name">{c.name}</span>
            <span className="cust-since">{c.since ? `Since ${c.since}` : c.country || ""}</span>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2} style={{ marginTop: "var(--space-2xl)" }}>
        <CTALink to="/clients" testid="clients-view-all-cta">View All Clients <ArrowRight size={15} /></CTALink>
      </Reveal>
    </div>
  </section>
);

const SUBJECTS = ["General Inquiry", "Product Quote", "Career", "Other"];

const ContactCTA = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    toast.success("Thank you! Your inquiry has been received.", { description: "Our team will get back to you within one business day." });
    setForm({ name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" });
  };
  return (
    <motion.section className="section cta-band" initial={{ scale: 0.97, opacity: 0.6 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, ease: EASE }} data-testid="contact-cta-section">
      <div className="container cta-grid">
        <div className="cta-info">
          <span className="chapter-num" style={{ color: "rgba(255,255,255,0.5)" }}>/06</span>
          <h2>Get in Touch</h2>
          <p>Request for further information — our engineering team responds within one business day.</p>
          <div className="cta-contact-list">
            <div className="cta-contact-item"><MapPin size={18} /><span>{COMPANY.address}</span></div>
            <div className="cta-contact-item"><Phone size={18} /><a href="tel:+918380092233">{COMPANY.phone}</a></div>
            <div className="cta-contact-item"><Mail size={18} /><a href="mailto:admin@mehtaent.com">{COMPANY.email}</a></div>
          </div>
        </div>
        <form className="cta-form" onSubmit={submit} data-testid="home-contact-form">
          <div className="form-grid">
            <div className="field"><label htmlFor="h-name">Name *</label><input id="h-name" required value={form.name} onChange={set("name")} placeholder="Your full name" data-testid="contact-input-name" /></div>
            <div className="field"><label htmlFor="h-email">Email *</label><input id="h-email" type="email" required value={form.email} onChange={set("email")} placeholder="you@company.com" data-testid="contact-input-email" /></div>
            <div className="field"><label htmlFor="h-phone">Phone</label><input id="h-phone" value={form.phone} onChange={set("phone")} placeholder="+91" data-testid="contact-input-phone" /></div>
            <div className="field"><label htmlFor="h-subject">Subject</label>
              <select id="h-subject" value={form.subject} onChange={set("subject")} data-testid="contact-select-subject">
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="field full"><label htmlFor="h-msg">Message</label><textarea id="h-msg" value={form.message} onChange={set("message")} placeholder="Tell us about your requirement..." data-testid="contact-input-message" /></div>
            <div className="full"><button type="submit" className="btn btn-primary" data-testid="contact-submit-button">Send Inquiry <ArrowRight size={16} /></button></div>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default function Home() {
  return (
    <PageWrap testid="home-page">
      <Hero />
      <TrustedBar />
      <Intro />
      <WhyUs />
      <Awards />
      <InfraPreview />
      <EditorialMarquee items={["Precision Forged", "Since 1986", "Pune — India", "IATF 16949"]} />
      <Customers />
      <ContactCTA />
    </PageWrap>
  );
}
