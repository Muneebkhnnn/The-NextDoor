import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { PROCESS } from "../data/content";
import RevealText from "../components/RevealText";

export default function Process() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );

      const items = listRef.current.querySelectorAll(".process-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
            },
          }
        );
        gsap.fromTo(
          item.querySelector(".process-dot"),
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: "back.out(3)",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="border-b border-[var(--color-line)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-20 max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ember)]">
            How it runs
          </p>
          <RevealText
            as="h2"
            className="font-display text-5xl tracking-tight text-[var(--color-cream)] sm:text-6xl"
          >
            Five stages, in order, every time.
          </RevealText>
        </div>

        <div ref={listRef} className="relative pl-12 sm:pl-20">
          <div
            className="absolute left-[7px] top-2 h-full w-px bg-[var(--color-line)] sm:left-[11px]"
            aria-hidden="true"
          />
          <div
            ref={lineRef}
            className="absolute left-[7px] top-2 h-full w-px scale-y-0 bg-[var(--color-ember)] sm:left-[11px]"
            aria-hidden="true"
          />

          <ol className="flex flex-col gap-16 sm:gap-20">
            {PROCESS.map((item) => (
              <li key={item.step} className="process-item relative">
                <span
                  className="process-dot absolute -left-12 top-1.5 flex h-4 w-4 scale-0 items-center justify-center rounded-full border-2 border-[var(--color-ember)] bg-[var(--color-ink)] sm:-left-20 sm:h-6 sm:w-6"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ember)]" />
                </span>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="font-mono text-sm text-[var(--color-muted)] sm:w-12">
                    {item.step}
                  </span>
                  <div className="max-w-2xl">
                    <h3 className="mb-2 font-display text-3xl tracking-tight text-[var(--color-cream)] sm:text-4xl">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
