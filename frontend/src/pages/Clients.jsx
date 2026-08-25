import { Globe2 } from "lucide-react";
import { Reveal, SectionHeading, PageHero, PageWrap } from "../components/Shared";
import { IMG, DOMESTIC_CLIENTS, INTL_CLIENTS } from "../data/content";

export default function Clients() {
  return (
    <PageWrap testid="clients-page">
      <PageHero title="Our Happy Clients" kicker="15+ Global OEMs · 3 Continents" sub="Relationships built over decades — from Tata Motors in 1991 to GM Korea in 2017." img={IMG.galleryFloor} />

      <section className="section" data-testid="domestic-clients-section">
        <div className="container">
          <SectionHeading kicker="Domestic Clients · India" title="The home team" />
          <div className="cl-grid">
            {DOMESTIC_CLIENTS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.06} className="cl-card glass-card" data-testid={`domestic-client-${i + 1}`}>
                <h3>{c.name}</h3>
                {c.origin && <span className="cl-origin">{c.origin}</span>}
                <span className="cl-since mono">Since {c.since}</span>
                <p className="cl-note">{c.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" data-testid="international-clients-section">
        <div className="container">
          <SectionHeading kicker="International Clients" title={<>From Pune <span className="accent">to the world</span></>} sub="Components shipped to Italy, South Africa, Colombia, Korea, Belgium, France and Germany." />
          <div className="cl-grid">
            {INTL_CLIENTS.map((c, i) => (
              <Reveal key={c.name + c.country} delay={i * 0.06} className="intl-card glass-card" data-testid={`intl-client-${i + 1}`}>
                <span className="intl-country"><Globe2 size={14} />{c.country}</span>
                <h3>{c.name}</h3>
                {c.since && <span className="cl-since mono">Since {c.since}</span>}
                <p className="cl-note">{c.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageWrap>
  );
}
