import { useEffect, useRef } from "react";
import "@/App.css";
import "@/styles/pages.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Infrastructure from "@/pages/Infrastructure";
import Products from "@/pages/Products";
import Quality from "@/pages/Quality";
import Clients from "@/pages/Clients";
import Gallery from "@/pages/Gallery";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
export const getLenis = () => lenisInstance;

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (lenisInstance) lenisInstance.scrollTo(el, { offset: -100 });
          else el.scrollIntoView({ behavior: "smooth" });
        }
      }, 450);
      return () => clearTimeout(t);
    }
    if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/products" element={<Products />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const rafRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => { lenis.raf(time); rafRef.current = requestAnimationFrame(raf); };
    rafRef.current = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollManager />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <Toaster position="bottom-right" theme="dark" richColors />
    </BrowserRouter>
  );
}

export default App;
