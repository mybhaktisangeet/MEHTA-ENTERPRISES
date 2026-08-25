import { useMemo, useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { toast } from "sonner";
import { Reveal, PageHero, PageWrap, playStamp } from "../components/Shared";
import { IMG, PRODUCTS } from "../data/content";

const MATERIALS = ["CR Steel", "HR Steel", "Galvanized Steel", "Stainless Steel", "High-Strength Steel"];
const PROCESSES = ["Progressive Stamping", "Transfer Die Stamping", "Deep Drawing", "MIG Welding", "Spot Welding", "Projection Welding", "Robotic Welding", "Zinc Plating", "Painting", "Deburring"];
const VOLUMES = ["Prototype (< 500 pcs)", "Low (500 – 5,000 pcs)", "Medium (5,000 – 50,000 pcs)", "High (50,000+ pcs)"];

export default function Quote() {
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [thickness, setThickness] = useState(2.0);
  const [processes, setProcesses] = useState([]);
  const [volume, setVolume] = useState(VOLUMES[1]);
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [stamping, setStamping] = useState(false);
  const refNo = useMemo(() => `ME-Q-${Date.now().toString(36).toUpperCase()}`, []);

  const toggleProcess = (p) =>
    setProcesses((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  const setC = (k) => (e) => setContact({ ...contact, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!category || !material || processes.length === 0) {
      toast.error("Almost there!", { description: "Please select a category, material, and at least one process." });
      return;
    }
    setStamping(true);
    playStamp();
    setTimeout(() => setStamping(false), 400);
    toast.success(`Quote request ${refNo} sent!`, { description: "Our engineering team will respond with pricing within one business day." });
    setCategory(""); setMaterial(""); setThickness(2.0); setProcesses([]); setVolume(VOLUMES[1]);
    setContact({ name: "", email: "", company: "" });
  };

  return (
    <PageWrap testid="quote-page">
      <PageHero title="Instant Quote" kicker="Spec It · Send It · Sorted" sub="Pick your material, thickness and processes — your pre-filled quote request reaches our engineers in seconds." img={IMG.heroPress} />

      <section className="section" data-testid="quote-builder-section">
        <div className="container">
          <form onSubmit={submit} className="quote-grid" data-testid="quote-form">
            <div>
              <Reveal className="q-panel glass-card">
                <div className="q-step"><b>1</b> Product Category</div>
                <div className="chip-row" data-testid="quote-category-chips">
                  {PRODUCTS.map((p) => (
                    <button type="button" key={p.id} className={`ptab ${category === p.name ? "active" : ""}`} onClick={() => setCategory(p.name)} data-testid={`quote-cat-${p.id}`}>
                      {p.name}
                    </button>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.06} className="q-panel glass-card">
                <div className="q-step"><b>2</b> Material Type</div>
                <div className="chip-row" data-testid="quote-material-chips">
                  {MATERIALS.map((m) => (
                    <button type="button" key={m} className={`ptab ${material === m ? "active" : ""}`} onClick={() => setMaterial(m)} data-testid={`quote-mat-${m.split(" ")[0].toLowerCase()}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.12} className="q-panel glass-card">
                <div className="q-step"><b>3</b> Sheet Thickness</div>
                <div className="q-range-row">
                  <input
                    type="range" min="0.5" max="10" step="0.25" value={thickness}
                    onChange={(e) => setThickness(Number(e.target.value))}
                    className="q-range" aria-label="Sheet thickness in millimeters"
                    data-testid="quote-thickness-slider"
                  />
                  <div className="q-range-val" data-testid="quote-thickness-value">{thickness.toFixed(2)} <small>MM</small></div>
                </div>
                <div className="q-range-limits"><span>0.50 MM</span><span>10.00 MM</span></div>
              </Reveal>

              <Reveal delay={0.18} className="q-panel glass-card">
                <div className="q-step"><b>4</b> Processes Required</div>
                <div className="chip-row" data-testid="quote-process-chips">
                  {PROCESSES.map((p) => (
                    <button type="button" key={p} className={`ptab ${processes.includes(p) ? "active" : ""}`} onClick={() => toggleProcess(p)} data-testid={`quote-proc-${p.split(" ")[0].toLowerCase()}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.24} className="q-panel glass-card">
                <div className="q-step"><b>5</b> Volume & Contact</div>
                <div className="form-grid">
                  <div className="field full"><label htmlFor="q-vol">Annual Volume</label>
                    <select id="q-vol" value={volume} onChange={(e) => setVolume(e.target.value)} data-testid="quote-select-volume">
                      {VOLUMES.map((v) => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div className="field"><label htmlFor="q-name">Name *</label><input id="q-name" required value={contact.name} onChange={setC("name")} placeholder="Your full name" data-testid="quote-input-name" /></div>
                  <div className="field"><label htmlFor="q-email">Email *</label><input id="q-email" type="email" required value={contact.email} onChange={setC("email")} placeholder="you@company.com" data-testid="quote-input-email" /></div>
                  <div className="field full"><label htmlFor="q-company">Company</label><input id="q-company" value={contact.company} onChange={setC("company")} placeholder="Company name (optional)" data-testid="quote-input-company" /></div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="spec-card glass-card" data-testid="quote-spec-sheet">
              <div className="spec-head">
                <h3><FileText size={13} style={{ verticalAlign: "-2px", marginRight: "6px" }} />Quote Spec Sheet</h3>
                <span>{refNo}</span>
              </div>
              <div className="spec-row"><span>Category</span><b className={category ? "" : "empty"} data-testid="spec-category">{category || "— select —"}</b></div>
              <div className="spec-row"><span>Material</span><b className={material ? "" : "empty"} data-testid="spec-material">{material || "— select —"}</b></div>
              <div className="spec-row"><span>Thickness</span><b data-testid="spec-thickness">{thickness.toFixed(2)} MM</b></div>
              <div className="spec-row"><span>Processes</span><b className={processes.length ? "" : "empty"} data-testid="spec-processes">{processes.length ? processes.join(", ") : "— select —"}</b></div>
              <div className="spec-row"><span>Volume</span><b data-testid="spec-volume">{volume}</b></div>
              <div className="spec-row"><span>Response</span><b>≤ 24 HRS</b></div>
              <span className="stamp-wrap" style={{ width: "100%" }}>
                <button type="submit" className={`btn btn-primary spec-cta stamp-btn ${stamping ? "stamping" : ""}`} data-testid="quote-submit-button">
                  Send Quote Request <ArrowRight size={16} />
                </button>
                {stamping && (
                  <span className="stamp-sparks" aria-hidden="true">
                    {[...Array(8)].map((_, i) => <i key={i} style={{ "--a": `${i * 45}deg` }} />)}
                  </span>
                )}
              </span>
            </Reveal>
          </form>
        </div>
      </section>
    </PageWrap>
  );
}
