import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "../lib/gsap";
import { TESTIMONIALS } from "../data/content";
import RevealText from "../components/RevealText";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);

  const goTo = useCallback((next) => {
    const total = TESTIMONIALS.length;
    setIndex(((next % total) + total) % total);
  }, []);

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(autoplayRef.current);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    gsap.fromTo(track, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
  }, [index]);

  const restartAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
  };

  const current = TESTIMONIALS[index];

  return (
    <section className="border-b border-[var(--color-line)] py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ember)]">
          What clients say
        </p>
        <RevealText
          as="h2"
          className="mb-16 font-display text-5xl tracking-tight text-[var(--color-cream)] sm:text-6xl"
        >
          Don't take the case studies' word for it.
        </RevealText>

        <div
          className="relative rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8 sm:p-14"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <span className="font-display text-7xl leading-none text-[var(--color-ember)]" aria-hidden="true">
            "
          </span>
          <div ref={trackRef} aria-live="polite">
            <blockquote className="-mt-6 mb-8 font-display text-2xl leading-snug tracking-tight text-[var(--color-cream)] sm:text-3xl">
              {current.quote}
            </blockquote>
            <footer className="font-mono text-sm text-[var(--color-muted)]">
              <span className="text-[var(--color-cream)]">{current.name}</span>
              {" — "}
              {current.role}
            </footer>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-[var(--color-line)] pt-6">
            <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial from ${t.name}`}
                  onClick={() => {
                    goTo(i);
                    restartAutoplay();
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-[var(--color-ember)]" : "w-1.5 bg-[var(--color-line)]"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous testimonial"
                data-cursor="prev"
                onClick={() => {
                  goTo(index - 1);
                  restartAutoplay();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-cream)] transition-colors hover:border-[var(--color-ember)]"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                data-cursor="next"
                onClick={() => {
                  goTo(index + 1);
                  restartAutoplay();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-cream)] transition-colors hover:border-[var(--color-ember)]"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
