import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { PROJECTS } from "../data/content";
import RevealText from "../components/RevealText";

export default function Portfolio() {
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = listRef.current.querySelectorAll(".project-row");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
            },
          }
        );
      });
    }, listRef);
    return () => ctx.revert();
  }, []);

  const handleEnter = (e, color) => {
    const row = e.currentTarget;
    gsap.to(row.querySelector(".project-swatch"), {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(row.querySelector(".project-name"), {
      x: 16,
      color,
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(row.querySelector(".project-arrow"), {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = (e) => {
    const row = e.currentTarget;
    gsap.to(row.querySelector(".project-swatch"), {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
    });
    gsap.to(row.querySelector(".project-name"), {
      x: 0,
      color: "var(--color-cream)",
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(row.querySelector(".project-arrow"), {
      x: -8,
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
    });
  };

  return (
    <section id="work" className="border-b border-[var(--color-line)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-16">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ember)]">
            Selected work
          </p>
          <RevealText
            as="h2"
            className="font-display text-5xl tracking-tight text-[var(--color-cream)] sm:text-6xl"
          >
            Four launches, in the founders' words.
          </RevealText>
        </div>

        <div ref={listRef} className="flex flex-col">
          {PROJECTS.map((project) => (
            <a
              key={project.name}
              href="#contact"
              data-cursor="view case"
              onPointerEnter={(e) => handleEnter(e, project.color)}
              onPointerLeave={handleLeave}
              className="project-row group relative flex flex-col gap-3 border-t border-[var(--color-line)] py-8 last:border-b sm:flex-row sm:items-center sm:gap-8 sm:py-10"
            >
              <span
                className="project-swatch hidden h-3 w-3 shrink-0 scale-0 rounded-full opacity-0 sm:block"
                style={{ backgroundColor: project.color }}
                aria-hidden="true"
              />

              <h3 className="project-name font-display text-4xl tracking-tight text-[var(--color-cream)] transition-colors sm:text-5xl sm:flex-1">
                {project.name}
              </h3>

              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)] sm:w-44">
                {project.type}
              </p>

              <p className="max-w-sm text-sm text-[var(--color-muted)]">{project.summary}</p>

              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-teal)] sm:w-40">
                {project.metric}
              </span>

              <span className="font-mono text-xs text-[var(--color-muted)] sm:w-12">
                {project.year}
              </span>

              <span
                className="project-arrow -translate-x-2 font-mono text-2xl text-[var(--color-cream)] opacity-0 sm:opacity-0"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
