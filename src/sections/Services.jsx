import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { SERVICES } from "../data/content";
import RevealText from "../components/RevealText";

export default function Services() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll(".service-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  const handleEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -8,
      borderColor: "var(--color-ember)",
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(e.currentTarget.querySelector(".service-arrow"), {
      x: 4,
      y: -4,
      duration: 0.4,
      ease: "power3.out",
    });
  };
  const handleLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      borderColor: "var(--color-line)",
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(e.currentTarget.querySelector(".service-arrow"), {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <section id="services" className="border-b border-[var(--color-line)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ember)]">
              What we do
            </p>
            <RevealText
              as="h2"
              className="font-display text-5xl tracking-tight text-[var(--color-cream)] sm:text-6xl"
            >
              Four services. Zero filler.
            </RevealText>
          </div>
          <p className="max-w-sm text-sm text-[var(--color-muted)]">
            We keep the offering narrow on purpose — every engagement gets the same senior team,
            not whoever's free that week.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[var(--color-line)] sm:grid-cols-2">
          {SERVICES.map((service) => (
            <div
              key={service.tag}
              data-cursor="explore"
              onPointerEnter={handleEnter}
              onPointerLeave={handleLeave}
              className="service-card group relative flex flex-col justify-between gap-10 border border-[var(--color-line)] bg-[var(--color-surface)] p-8 sm:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
                  {service.tag}
                </span>
                <span className="service-arrow font-mono text-xl text-[var(--color-ember)]" aria-hidden="true">
                  ↗
                </span>
              </div>

              <div>
                <h3 className="mb-3 font-display text-3xl tracking-tight text-[var(--color-cream)] sm:text-4xl">
                  {service.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                  {service.description}
                </p>
              </div>

              <ul className="flex flex-wrap gap-2" aria-label={`${service.title} tech stack`}>
                {service.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-[var(--color-line)] px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-[var(--color-muted)]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
