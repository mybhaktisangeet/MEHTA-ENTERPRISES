import { BadgeCheck, ShieldCheck, Trophy } from "lucide-react";
import { Reveal, SectionHeading, PageHero, PageWrap } from "../components/Shared";
import { IMG, CERTS, AWARDS } from "../data/content";

const POLICY_POINTS = [
  "Appropriate to the purpose and context of the organization",
  "Committed to continuous improvement of the QMS",
  "Provides a framework for establishing company objectives",
  "Satisfies applicable requirements",
];

export default function Quality() {
  return (
    <PageWrap testid="quality-page">
      <PageHero title="Quality Assurance" kicker="IATF 16949 · Bureau Veritas" sub="CMM-verified, hardness-tested, and traceable — quality is not a department here, it is the operating system." img={IMG.qualityLab} />

      <section className="section" id="policy" data-testid="quality-policy-section">
        <div className="container">
          <SectionHeading kicker="Quality Policy" title="Our commitment, in writing" />
          <Reveal>
            <p className="qp-quote">
              "At Mehta Enterprises we are committed to delivering <em>quality products at the optimum price</em> on a timely basis to enhance customer satisfaction."
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ marginTop: "var(--space-xl)", color: "var(--color-metal-400)", maxWidth: "760px" }}>
              Our Quality Management System complies with all requirements while carrying out continual improvement in the QMS. The policy is documented and communicated throughout the organization via training and display.
            </p>
          </Reveal>
          <div className="qp-points">
            {POLICY_POINTS.map((p, i) => (
              <Reveal key={p} delay={i * 0.08} className="qp-point glass-card" data-testid={`policy-point-${i + 1}`}>
                <BadgeCheck size={20} />
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="certifications" data-testid="certifications-section">
        <div className="container">
          <SectionHeading kicker="Certifications" title={<>Certified to the <span className="accent">automotive gold standard</span></>} />
          <div className="cert-grid">
            {CERTS.map((c, i) => (
              <Reveal key={i} delay={i * 0.12} className="cert-card glass-card" data-testid={`cert-card-${i + 1}`}>
                <div className="cert-badge"><ShieldCheck size={28} /></div>
                <h3>{c.title}</h3>
                <span className="cert-entity">{c.entity}</span>
                <p>{c.desc} — issued by {c.by}.</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="awards" data-testid="awards-timeline-section">
        <div className="container">
          <SectionHeading kicker="Awards" title="A shelf that keeps growing" />
          <div className="aw-list">
            {AWARDS.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08} className="aw-item glass-card" data-testid={`award-item-${i + 1}`}>
                <span className="aw-year">{a.year}</span>
                <div>
                  <h4>{a.title}</h4>
                  <p>Presented by {a.by}</p>
                </div>
                <Trophy size={26} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageWrap>
  );
}
