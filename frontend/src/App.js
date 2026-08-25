import { lazy, Suspense, useEffect, useRef, useState } from "react";
import "@/App.css";
import "@/styles/pages.css";
import "@/styles/extras.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";

const About = lazy(() => import("@/pages/About"));
const Infrastructure = lazy(() => import("@/pages/Infrastructure"));
const Products = lazy(() => import("@/pages/Products"));
const Quality = lazy(() => import("@/pages/Quality"));
const Clients = lazy(() => import("@/pages/Clients"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Careers = lazy(() => import("@/pages/Careers"));
const Contact = lazy(() => import("@/pages/Contact"));
const Quote = lazy(() => import("@/pages/Quote"));
const NotFound = lazy(() => import("@/pages/NotFound"));

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

const RouteLoader = () => (
  <div className="route-loader" data-testid="route-loader">
    <span className="logo-mark">ME</span>
  </div>
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
};

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toTop = () => {
    if (lenisInstance) lenisInstance.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button className={`back-top ${show ? "show" : ""}`} onClick={toTop} aria-label="Back to top" data-testid="back-to-top-button">
      <ArrowUp size={18} />
    </button>
  );
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
        <Route path="/quote" element={<Quote />} />
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
      <ScrollProgress />
      <Navbar />
      <Suspense fallback={<RouteLoader />}>
        <AnimatedRoutes />
      </Suspense>
      <BackToTop />
      <Footer />
      <Toaster position="bottom-right" theme="dark" richColors />
    </BrowserRouter>
  );
}

export default App;
