import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Reveal, SectionHeading, PageHero, PageWrap } from "../components/Shared";
import { IMG, GALLERY_ITEMS } from "../data/content";

const CATS = ["All", "Facility", "Products", "Team"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const items = filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === filter);

  return (
    <PageWrap testid="gallery-page">
      <PageHero title="Gallery" kicker="Inside the Forge" sub="Presses, welding cells, precision parts and the people behind them." img={IMG.heroPress} />

      <section className="section" data-testid="gallery-section">
        <div className="container">
          <SectionHeading kicker="Photo Gallery" title="A look inside" />
          <div className="g-filters" data-testid="gallery-filters">
            {CATS.map((c) => (
              <button key={c} className={`ptab ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)} data-testid={`gallery-filter-${c.toLowerCase()}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="masonry">
            {items.map((g, i) => (
              <Reveal key={g.title} delay={(i % 3) * 0.06} y={30} className="g-item" onClick={() => setLightbox(g)} data-testid={`gallery-item-${i + 1}`}>
                <div className="img-frame">
                  <img src={g.img} alt={g.title} loading="lazy" />
                  <span className="frame-tag">{g.title}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} data-testid="gallery-lightbox">
            <motion.img
              src={lightbox.img}
              alt={lightbox.title}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="lb-close" onClick={() => setLightbox(null)} aria-label="Close" data-testid="lightbox-close-button"><X size={20} /></button>
            <span className="lb-caption">{lightbox.title}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrap>
  );
}
