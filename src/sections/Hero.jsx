import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import RevealText from "../components/RevealText";
import MagneticButton from "../components/MagneticButton";

const TYPED = "Design . Develop . Deliver";

export default function Hero() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const orbRef = useRef(null);
  const [typed, setTyped] = useState("");
  const [caretVisible, setCaretVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(TYPED.slice(0, i));
      if (i >= TYPED.length) clearInterval(id);
    }, 38);

    const blink = setInterval(() => setCaretVisible((v) => !v), 530);
    return () => {
      clearInterval(id);
      clearInterval(blink);
    };
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(gridRef.current, { x: x * 10, y: y * 10, duration: 1.2, ease: "power3.out" });
      gsap.to(orbRef.current, { x: x * -24, y: y * -24, duration: 1.4, ease: "power3.out" });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      ".hero-eyebrow",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    ).fromTo(
      ".hero-sub, .hero-cta, .hero-meta",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
      "-=0.2"
    );
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-[var(--color-line)] pt-28 pb-16"
    >
      <div
        ref={gridRef}
        className="bg-grid pointer-events-none absolute -inset-x-10 -inset-y-10"
        aria-hidden="true"
      />
      <div
        ref={orbRef}
        className="pointer-events-none absolute right-[-10%] top-1/4 h-[28rem] w-[28rem] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255,90,31,0.22), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10">
        <p className="hero-eyebrow mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ember)]">
          Web development studio — est. 2024
        </p>

        <RevealText
          as="h1"
          className="font-display text-[15vw] leading-[0.85] tracking-tight text-[var(--color-cream)] sm:text-[10vw] lg:text-[7.2rem]"
        >
          We build sites that ship like products.
        </RevealText>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="hero-sub max-w-xl text-base text-[var(--color-muted)] sm:text-lg">
            Forgeworks is a small studio of engineers and designers who design, build, and harden
            web products end to end — for businesses, startups and teams tired of
            slow, fragile sites.
          </p>

          <div className="hero-cta flex flex-wrap items-center gap-4">
            <MagneticButton
              as="a"
              href="#contact"
              data-cursor="let's go"
              className="inline-flex items-center gap-3 rounded-full bg-[var(--color-ember)] px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-[var(--color-ink)] transition-transform hover:scale-[1.02]"
            >
              Start a project
              <span aria-hidden="true">→</span>
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#work"
              data-cursor="see work"
              className="inline-flex items-center gap-3 rounded-full border border-[var(--color-line)] px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-[var(--color-cream)] transition-colors hover:border-[var(--color-cream)]"
            >
              See the work
            </MagneticButton>
          </div>
        </div>

        <div className="hero-meta mt-16 flex flex-col gap-6 border-t border-[var(--color-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex items-center gap-2 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2.5"
            aria-hidden="true"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 font-mono text-[13px] text-[var(--color-muted)]">
              {typed}
              <span
                className="inline-block w-[7px]"
                style={{ opacity: caretVisible ? 1 : 0 }}
              >
                ▌
              </span>
            </span>
          </div>

          <dl className="flex flex-wrap gap-x-10 gap-y-3 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
            <div>
              <dt className="inline text-[var(--color-cream)]">30+</dt>{" "}
              <dd className="inline">products shipped</dd>
            </div>
            <div>
              <dt className="inline text-[var(--color-cream)]">99%</dt>{" "}
              <dd className="inline">Client satisfaction</dd>
            </div>
            <div>
              <dt className="inline text-[var(--color-cream)]">4</dt>{" "}
              <dd className="inline">engineers, no bloat</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
