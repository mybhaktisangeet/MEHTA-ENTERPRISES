import { useState } from "react";
import { GraduationCap, Users, TrendingUp, MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SectionHeading, PageHero, PageWrap } from "../components/Shared";
import { IMG, OPENINGS } from "../data/content";

const PERKS = [
  { icon: GraduationCap, title: "Learn from Masters", desc: "Work alongside engineers who have developed 420+ components for the world's biggest OEMs — with in-house tool design as your classroom." },
  { icon: Users, title: "Family-Run, People-First", desc: "38 years of second-generation leadership means long careers, real mentorship, and a culture built on trust and transparency." },
  { icon: TrendingUp, title: "Growing Global Footprint", desc: "From Pune to Italy, Korea and Colombia — grow with a group that keeps adding international clients and facilities." },
];

export default function Careers() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: OPENINGS[0].role, message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    toast.success("Application submitted!", { description: "Our HR team will review your profile and reach out shortly." });
    setForm({ name: "", email: "", phone: "", role: OPENINGS[0].role, message: "" });
  };

  return (
    <PageWrap testid="careers-page">
      <PageHero title="Careers" kicker="Join the Forge" sub="Build the components that move Tata Motors, GM and Mercedes-Benz — and build a career that lasts decades." img={IMG.careersTeam} />

      <section className="section" data-testid="why-work-section">
        <div className="container">
          <SectionHeading kicker="Why Work With Us" title="More than a job — a craft" />
          <div className="perk-grid">
            {PERKS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="perk-card glass-card" data-testid={`perk-card-${i + 1}`}>
                <p.icon size={26} />
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" data-testid="openings-section">
        <div className="container">
          <SectionHeading kicker="Current Openings" title={<>We're <span className="accent">hiring</span></>} />
          <div className="open-list">
            {OPENINGS.map((o, i) => (
              <Reveal key={o.role} delay={i * 0.07} className="open-item glass-card" data-testid={`opening-${i + 1}`}>
                <div>
                  <h4>{o.role}</h4>
                  <div className="open-meta">
                    <span>{o.dept}</span>
                    <span>{o.type}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}><MapPin size={11} />{o.loc}</span>
                  </div>
                </div>
                <a href="#apply" className="btn btn-ghost" style={{ padding: "0.6rem 1.2rem" }}>Apply</a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="apply" data-testid="application-section">
        <div className="container-narrow">
          <SectionHeading kicker="Apply Now" title="Send us your profile" />
          <Reveal className="glass-card c-form-card">
            <form onSubmit={submit} data-testid="career-application-form">
              <div className="form-grid">
                <div className="field"><label htmlFor="c-name">Name *</label><input id="c-name" required value={form.name} onChange={set("name")} placeholder="Your full name" data-testid="career-input-name" /></div>
                <div className="field"><label htmlFor="c-email">Email *</label><input id="c-email" type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com" data-testid="career-input-email" /></div>
                <div className="field"><label htmlFor="c-phone">Phone *</label><input id="c-phone" required value={form.phone} onChange={set("phone")} placeholder="+91" data-testid="career-input-phone" /></div>
                <div className="field"><label htmlFor="c-role">Position</label>
                  <select id="c-role" value={form.role} onChange={set("role")} data-testid="career-select-role">
                    {OPENINGS.map((o) => <option key={o.role}>{o.role}</option>)}
                    <option>Other / General Application</option>
                  </select>
                </div>
                <div className="field full"><label htmlFor="c-msg">Brief Introduction</label><textarea id="c-msg" value={form.message} onChange={set("message")} placeholder="Tell us about your experience..." data-testid="career-input-message" /></div>
                <div className="full"><button type="submit" className="btn btn-primary" data-testid="career-submit-button">Submit Application <ArrowRight size={16} /></button></div>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </PageWrap>
  );
}
