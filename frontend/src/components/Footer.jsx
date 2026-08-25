import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import { COMPANY, GROUP_COMPANIES } from "../data/content";

const LINKS = [
  { label: "Home", to: "/" }, { label: "About", to: "/about" },
  { label: "Products", to: "/products" }, { label: "Infrastructure", to: "/infrastructure" },
  { label: "Quality", to: "/quality" }, { label: "Clients", to: "/clients" },
  { label: "Gallery", to: "/gallery" }, { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export const Footer = () => (
  <footer className="footer" data-testid="main-footer">
    <div className="container f-grid">
      <div className="f-col f-brand">
        <Link to="/" className="nav-logo">
          <span className="logo-mark">ME</span>
          <span className="logo-text"><strong>MEHTA</strong> ENTERPRISES<em>Precision Forged · Since 1986</em></span>
        </Link>
        <p>High-precision sheet metal press components and welded assemblies for global automotive leaders — engineered in Pune, trusted worldwide since 1986.</p>
        <div className="f-cert"><ShieldCheck size={16} /> IATF 16949 Certified — Bureau Veritas</div>
      </div>

      <div className="f-col">
        <h4>Quick Links</h4>
        <ul>
          {LINKS.map((l) => <li key={l.to}><Link to={l.to} data-testid={`footer-link-${l.label.toLowerCase()}`}>{l.label}</Link></li>)}
        </ul>
      </div>

      <div className="f-col">
        <h4>Group Companies</h4>
        <ul className="f-group">
          {GROUP_COMPANIES.map((g) => (
            <li key={g.name}>
              <strong>{g.name}</strong>
              <span>{g.location}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="f-col">
        <h4>Contact</h4>
        <ul className="f-contact">
          <li><MapPin size={15} /><span>{COMPANY.address}</span></li>
          <li><Phone size={15} /><a href="tel:+918380092233">{COMPANY.phone}</a></li>
          <li><Mail size={15} /><a href="mailto:admin@mehtaent.com">{COMPANY.email}</a></li>
        </ul>
      </div>
    </div>

    <div className="f-bottom">
      <div className="container f-bottom-inner">
        <span>© {new Date().getFullYear()} Mehta Enterprises. All Rights Reserved.</span>
        <span className="mono f-tag">MIDC BHOSARI · PUNE · 18.6298° N, 73.8480° E</span>
      </div>
    </div>
  </footer>
);
