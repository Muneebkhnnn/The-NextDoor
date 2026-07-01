import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { FAQS } from "../data/content";
import RevealText from "../components/RevealText";

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const arrowRef = useRef(null);

  const toggle = () => {
    const body = bodyRef.current;
    if (!body) return;

    if (!open) {
      gsap.set(body, { display: "block" });
      gsap.fromTo(
        body,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.45, ease: "power3.out" }
      );
      gsap.to(arrowRef.current, { rotate: 45, duration: 0.35, ease: "power3.out" });
    } else {
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power3.inOut",
        onComplete: () => gsap.set(body, { display: "none" }),
      });
      gsap.to(arrowRef.current, { rotate: 0, duration: 0.35, ease: "power3.out" });
    }
    setOpen(!open);
  };

  return (
    <div className="faq-item border-t border-[var(--color-line)]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`faq-body-${index}`}
        id={`faq-trigger-${index}`}
        onClick={toggle}
        className="flex w-full items-start justify-between gap-6 py-6 text-left sm:items-center sm:py-7"
      >
        <span className="text-base font-medium text-[var(--color-cream)] sm:text-lg">
          {faq.question}
        </span>
        <span
          ref={arrowRef}
          aria-hidden="true"
          className="mt-1 shrink-0 font-mono text-xl text-[var(--color-ember)] sm:mt-0"
        >
          +
        </span>
      </button>

      <div
        ref={bodyRef}
        id={`faq-body-${index}`}
        role="region"
        aria-labelledby={`faq-trigger-${index}`}
        style={{ display: "none", overflow: "hidden" }}
      >
        <p className="pb-6 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = listRef.current.querySelectorAll(".faq-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
          },
        }
      );
    }, listRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" className="border-b border-[var(--color-line)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ember)]">
              Questions
            </p>
            <RevealText
              as="h2"
              className="font-display text-5xl tracking-tight text-[var(--color-cream)] sm:text-6xl"
            >
              The things people always ask first.
            </RevealText>
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              Anything not answered here?{" "}
              <a
                href="#contact"
                className="text-[var(--color-cream)] underline underline-offset-4 hover:text-[var(--color-ember)]"
              >
                Just ask.
              </a>
            </p>
          </div>

          <div ref={listRef}>
            {FAQS.map((faq, i) => (
              <FAQItem key={faq.question} faq={faq} index={i} />
            ))}
            <div className="border-t border-[var(--color-line)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
