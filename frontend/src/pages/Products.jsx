import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading, PageHero, PageWrap, EASE } from "../components/Shared";
import { IMG, PRODUCTS, CAPABILITIES } from "../data/content";

export default function Products() {
  const { hash } = useLocation();
  const [active, setActive] = useState(PRODUCTS[0].id);

  useEffect(() => {
    const id = hash.replace("#", "");
    if (PRODUCTS.some((p) => p.id === id)) setActive(id);
  }, [hash]);

  const cat = PRODUCTS.find((p) => p.id === active);

  return (
    <PageWrap testid="products-page">
      <PageHero title="Products" kicker="Six Categories · 420+ Components" sub="From engine parts to vehicle-level fitment parts — every sheet metal requirement of the automobile segment, under one roof." img={IMG.heroWelding} />

      <section className="section" data-testid="product-categories-section">
        <div className="container">
          <SectionHeading kicker="Product Categories" title="What we manufacture" />
          <div className="ptabs" role="tablist" data-testid="product-tabs">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={active === p.id}
                className={`ptab ${active === p.id ? "active" : ""}`}
                onClick={() => setActive(p.id)}
                data-testid={`product-tab-${p.id}`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.id}
              className="pdetail"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: EASE }}
              data-testid={`product-detail-${cat.id}`}
            >
              <div className="img-frame">
                <img src={cat.img} alt={cat.name} loading="lazy" />
                <span className="frame-tag">{cat.name}</span>
              </div>
              <div>
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                <ul className="fac-list">
                  {cat.items.map((it) => <li key={it}><CheckCircle2 size={14} />{it}</li>)}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="section section-alt" data-testid="product-grid-section">
        <div className="container">
          <SectionHeading kicker="The Range" title="Component showcase" />
          <div className="pgrid">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08} className="pcard" onClick={() => setActive(p.id)}>
                <div className="img-frame">
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="pcard-overlay">
                  <span>{p.items.length} product lines</span>
                  <h4>{p.name}</h4>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-testid="capabilities-section">
        <div className="container">
          <SectionHeading kicker="Capabilities Summary" title={<>Manufacturing <span className="accent">muscle</span></>} />
          <Reveal>
            <div className="cap-row">
              {CAPABILITIES.map((c) => (
                <div className="cap-item" key={c.label} data-testid={`capability-${c.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <strong>{c.label}</strong>
                  <span>{c.value}</span>
                </div>
              ))}
              <div className="cap-item">
                <strong>Press Capacity</strong>
                <span>Mechanical presses from 30 Ton to 400 Ton</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageWrap>
  );
}
