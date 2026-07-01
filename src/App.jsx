import { useState, useEffect } from "react";
import { gsap } from "./lib/gsap";

import Loader from "./components/Loader";
import CursorFollower from "./components/CursorFollower";
import Navbar from "./components/Navbar";

import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Portfolio from "./sections/Portfolio";
import Process from "./sections/Process";
import Testimonials from "./sections/Testimonials";
import Pricing from "./sections/Pricing";
import FAQ from "./sections/FAQ";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = () => {
    setLoaded(true);
    document.body.style.overflow = "";
    gsap.fromTo(
      "#main-content",
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  };

  useEffect(() => {
    if (!loaded) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [loaded]);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <CursorFollower />

      {!loaded && <Loader onComplete={handleLoaded} />}

      <div
        id="main-content"
        className="cursor-none-capable"
        style={{ opacity: 0 }}
        aria-hidden={!loaded}
      >
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <Process />
          <Testimonials />
          <Pricing />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
