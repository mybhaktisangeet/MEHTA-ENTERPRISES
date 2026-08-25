import { ArrowRight, Wrench } from "lucide-react";
import { Reveal, SectionHeading, PageHero, PageWrap } from "../components/Shared";
import { IMG, FACILITIES, PROCESS_STEPS } from "../data/content";

export default function Infrastructure() {
  return (
    <PageWrap testid="infrastructure-page">
      <PageHero title="Infrastructure" kicker="Facilities · MIDC Bhosari" sub="State-of-the-art manufacturing across three units — press lines from 30 to 400 tons, robotic welding, in-house tooling and CMM-grade metrology." img={IMG.pressShop} />

      <section className="section" data-testid="facilities-section">
        <div className="container">
          <SectionHeading kicker="Facility Overview" title="Where precision takes shape" />
          {FACILITIES.map((f, i) => (
            <div className={`fac-row ${i % 2 === 1 ? "rev" : ""}`} key={f.id} id={f.id} data-testid={`facility-${f.id}`}>
              <Reveal className="fac-img">
                <div className="img-frame">
                  <img src={f.img} alt={f.name} loading="lazy" />
                  <span className="frame-tag">{f.name}</span>
                </div>
              </Reveal>
              <Reveal delay={0.12} className="fac-body">
                <span className="fac-num mono">/{String(i + 1).padStart(2, "0")}</span>
                <h3>{f.name}</h3>
                <p>{f.desc}</p>
                <ul className="fac-list">
                  {f.equipment.map((e) => <li key={e}><Wrench size={14} />{e}</li>)}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-alt" data-testid="process-flow-section">
        <div className="container">
          <SectionHeading kicker="Manufacturing Process" title={<>From raw coil <span className="accent">to dispatch</span></>} sub="Every component follows a controlled eight-stage flow — traceable, inspected, and delivered on time." />
          <div className="process-flow">
            {PROCESS_STEPS.map((s, i) => (
              <Reveal key={s} delay={i * 0.08} className="pf-step glass-card" data-testid={`process-step-${i + 1}`}>
                <div className="pf-num">{String(i + 1).padStart(2, "0")}</div>
                <h4>{s}</h4>
                {i < PROCESS_STEPS.length - 1 && (i + 1) % 4 !== 0 && <ArrowRight className="pf-arrow" size={18} />}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageWrap>
  );
}
