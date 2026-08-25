import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SectionHeading, PageHero, PageWrap } from "../components/Shared";
import { IMG, COMPANY, GROUP_COMPANIES } from "../data/content";

const SUBJECTS = ["General Inquiry", "Product Quote", "Career", "Other"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    toast.success("Message sent!", { description: "Thank you for reaching out — we'll respond within one business day." });
    setForm({ name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" });
  };

  return (
    <PageWrap testid="contact-page">
      <PageHero title="Contact Us" kicker="Get in Touch" sub="Request a quote, discuss a drawing, or plan a plant visit — our team responds within one business day." img={IMG.heroWelding} />

      <section className="section" data-testid="contact-section">
        <div className="container contact-grid">
          <Reveal className="glass-card c-form-card">
            <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--space-xl)" }}>Send us a message</h2>
            <form onSubmit={submit} data-testid="contact-page-form">
              <div className="form-grid">
                <div className="field"><label htmlFor="p-name">Name *</label><input id="p-name" required value={form.name} onChange={set("name")} placeholder="Your full name" data-testid="contactpage-input-name" /></div>
                <div className="field"><label htmlFor="p-email">Email *</label><input id="p-email" type="email" required value={form.email} onChange={set("email")} placeholder="you@company.com" data-testid="contactpage-input-email" /></div>
                <div className="field"><label htmlFor="p-phone">Phone</label><input id="p-phone" value={form.phone} onChange={set("phone")} placeholder="+91" data-testid="contactpage-input-phone" /></div>
                <div className="field"><label htmlFor="p-subject">Subject</label>
                  <select id="p-subject" value={form.subject} onChange={set("subject")} data-testid="contactpage-select-subject">
                    {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field full"><label htmlFor="p-msg">Message *</label><textarea id="p-msg" required value={form.message} onChange={set("message")} placeholder="Tell us about your requirement..." data-testid="contactpage-input-message" /></div>
                <div className="full"><button type="submit" className="btn btn-primary" data-testid="contactpage-submit-button">Send Message <ArrowRight size={16} /></button></div>
              </div>
            </form>
          </Reveal>

          <div className="c-info-stack">
            <Reveal delay={0.08} className="c-info-card glass-card">
              <MapPin size={20} />
              <div>
                <h4>Head Office</h4>
                <p>{COMPANY.address}</p>
              </div>
            </Reveal>
            <Reveal delay={0.12} className="c-info-card glass-card">
              <Phone size={20} />
              <div>
                <h4>Phone</h4>
                <a href="tel:+918380092233">{COMPANY.phone}</a>
              </div>
            </Reveal>
            <Reveal delay={0.16} className="c-info-card glass-card">
              <Mail size={20} />
              <div>
                <h4>Email</h4>
                <a href="mailto:admin@mehtaent.com">{COMPANY.email}</a>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="c-info-card glass-card">
              <Clock size={20} />
              <div>
                <h4>Working Hours</h4>
                <p>Monday – Saturday · 9:00 AM – 6:00 PM IST</p>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="map-frame" data-testid="contact-map">
                <iframe
                  title="Mehta Enterprises — MIDC Bhosari, Pune"
                  src="https://www.google.com/maps?q=J+Block+MIDC+Bhosari+Pune+411026&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-alt" data-testid="group-addresses-section">
        <div className="container">
          <SectionHeading kicker="Group Companies" title="Three units, one campus" />
          <div className="perk-grid">
            {GROUP_COMPANIES.map((g, i) => (
              <Reveal key={g.name} delay={i * 0.1} className="perk-card glass-card" data-testid={`group-company-${i + 1}`}>
                <MapPin size={22} />
                <h3>{g.name}</h3>
                <p>{g.location}</p>
                <p style={{ marginTop: "0.4rem", color: "var(--color-metal-500)" }}>{g.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageWrap>
  );
}
