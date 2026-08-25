import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";

const DROPDOWNS = {
  About: [
    { label: "Company Overview", to: "/about#story" },
    { label: "Leadership Team", to: "/about#leadership" },
    { label: "Chairman's Message", to: "/about#message" },
    { label: "Vision, Mission & Values", to: "/about#vision" },
    { label: "Company Timeline", to: "/about#timeline" },
  ],
  Products: [
    { label: "Chassis & Fitment Parts", to: "/products#chassis" },
    { label: "Pedal & Lever Assemblies", to: "/products#pedals" },
    { label: "Brackets & Mounting", to: "/products#brackets" },
    { label: "Welded Assemblies", to: "/products#welded" },
    { label: "Stamped Components", to: "/products#stamped" },
    { label: "Engine Parts", to: "/products#engine" },
  ],
  Quality: [
    { label: "Quality Assurance", to: "/quality#policy" },
    { label: "Certifications", to: "/quality#certifications" },
    { label: "Awards", to: "/quality#awards" },
  ],
};

const LINKS = [
  { label: "About", to: "/about" },
  { label: "Infrastructure", to: "/infrastructure" },
  { label: "Products", to: "/products" },
  { label: "Quality", to: "/quality" },
  { label: "Clients", to: "/clients" },
  { label: "Gallery", to: "/gallery" },
  { label: "Careers", to: "/careers" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(null);
  const [mobExpand, setMobExpand] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setDrop(null); }, [pathname]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <>
      <header className={`nav ${scrolled || open ? "nav-scrolled" : ""}`} data-testid="main-navbar">
        <div className="container-wide nav-inner">
          <Link to="/" className="nav-logo" data-testid="nav-logo-link" aria-label="Mehta Enterprises — Home">
            <span className="logo-mark">ME</span>
            <span className="logo-text">
              <strong>MEHTA</strong> ENTERPRISES
              <em>Precision Forged · Since 1986</em>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l) => (
              <div key={l.label} className="nav-item" onMouseEnter={() => setDrop(l.label)} onMouseLeave={() => setDrop(null)}>
                <NavLink to={l.to} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} data-testid={`nav-link-${l.label.toLowerCase()}`}>
                  {l.label}
                  {DROPDOWNS[l.label] && <ChevronDown size={13} strokeWidth={2.5} />}
                </NavLink>
                <AnimatePresence>
                  {DROPDOWNS[l.label] && drop === l.label && (
                    <motion.div className="drop-menu" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.22 }}>
                      {DROPDOWNS[l.label].map((d) => (
                        <Link key={d.to} to={d.to} className="drop-link">{d.label} <ArrowUpRight size={12} /></Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <Link to="/contact" className="nav-cta" data-testid="nav-contact-cta">Contact Us</Link>

          <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Toggle menu" data-testid="nav-mobile-toggle">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} data-testid="mobile-menu">
            <nav className="mobile-links">
              <Link to="/" className="mob-link" data-testid="mobile-link-home">Home</Link>
              {LINKS.map((l, i) => (
                <div key={l.label}>
                  <div className="mob-row">
                    <Link to={l.to} className="mob-link">{l.label}</Link>
                    {DROPDOWNS[l.label] && (
                      <button className="mob-expand" onClick={() => setMobExpand(mobExpand === l.label ? null : l.label)} aria-label={`Expand ${l.label}`}>
                        <ChevronDown size={18} style={{ transform: mobExpand === l.label ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
                      </button>
                    )}
                  </div>
                  {DROPDOWNS[l.label] && mobExpand === l.label && (
                    <div className="mob-sub">
                      {DROPDOWNS[l.label].map((d) => <Link key={d.to} to={d.to} className="mob-sub-link">{d.label}</Link>)}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: "1.5rem" }} data-testid="mobile-contact-cta">Contact Us</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
