import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { PRICING } from "../data/content";
import RevealText from "../components/RevealText";
import MagneticButton from "../components/MagneticButton";

export default function Pricing() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.querySelectorAll(".price-card"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" className="border-b border-[var(--color-line)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ember)]">
            Investment
          </p>
          <RevealText
            as="h2"
            className="font-display text-5xl tracking-tight text-[var(--color-cream)] sm:text-6xl"
          >
            Priced for the work, not the worry.
          </RevealText>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRICING.map((tier) => (
            <div
              key={tier.name}
              className={`price-card flex flex-col gap-8 rounded-2xl border p-8 sm:p-10 ${
                tier.highlight
                  ? "border-[var(--color-ember)] bg-[var(--color-surface-2)] lg:-translate-y-4"
                  : "border-[var(--color-line)] bg-[var(--color-surface)]"
              }`}
            >
              {tier.highlight && (
                <span className="-mt-2 w-fit rounded-full bg-[var(--color-ember)] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink)]">
                  Most common
                </span>
              )}

              <div>
                <h3 className="font-display text-3xl tracking-tight text-[var(--color-cream)]">
                  {tier.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {tier.description}
                </p>
              </div>

              <div>
                <span className="font-display text-5xl tracking-tight text-[var(--color-cream)]">
                  {tier.price}
                </span>
                <span className="ml-2 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                  {tier.period}
                </span>
              </div>

              <ul className="flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-[var(--color-cream)]/90">
                    <span className="mt-1 font-mono text-[var(--color-ember)]" aria-hidden="true">
                      ▸
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <MagneticButton
                as="a"
                href="#contact"
                data-cursor="select"
                className={`mt-2 inline-flex items-center justify-center rounded-full px-6 py-3.5 font-mono text-sm uppercase tracking-wider transition-colors ${
                  tier.highlight
                    ? "bg-[var(--color-ember)] text-[var(--color-ink)] hover:opacity-90"
                    : "border border-[var(--color-line)] text-[var(--color-cream)] hover:border-[var(--color-cream)]"
                }`}
              >
                Get started
              </MagneticButton>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
          All tiers include a fixed-scope contract — no surprise invoices.
        </p>
      </div>
    </section>
  );
}
