import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

const LINES = [
  "$ npm run build",
  "compiling studio.forgeworks...",
  "optimizing assets... done",
  "build ready in 1.2s",
];

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const barRef = useRef(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      onComplete?.();
      return;
    }

    let lineTimer;
    let i = 0;
    lineTimer = setInterval(() => {
      i += 1;
      setVisibleLines(i);
      if (i >= LINES.length) clearInterval(lineTimer);
    }, 260);

    const counter = { val: 0 };
    gsap.to(counter, {
      val: 100,
      duration: 1.5,
      ease: "power2.inOut",
      delay: 0.2,
      onUpdate: () => setPercent(Math.round(counter.val)),
      onComplete: () => {
        const tl = gsap.timeline({
          onComplete: () => onComplete?.(),
        });
        tl.to(barRef.current, { opacity: 0, duration: 0.2 })
          .to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
          });
      },
    });

    return () => clearInterval(lineTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-start justify-center bg-[var(--color-ink)] px-6 sm:px-12"
      role="status"
      aria-live="polite"
      aria-label="Loading Forgeworks"
    >
      <div className="mx-auto w-full max-w-md font-mono text-xs sm:text-sm text-[var(--color-muted)]">
        {LINES.slice(0, visibleLines).map((line, idx) => (
          <p key={idx} className="mb-1.5 text-[var(--color-cream)]/80">
            {idx === 0 ? <span className="text-[var(--color-ember)]">{line}</span> : line}
          </p>
        ))}
        <div ref={barRef} className="mt-4">
          <div className="mb-2 flex items-center justify-between text-[var(--color-muted)]">
            <span>building</span>
            <span>{percent}%</span>
          </div>
          <div className="h-[2px] w-full bg-[var(--color-line)]">
            <div
              className="h-full bg-[var(--color-ember)]"
              style={{ width: `${percent}%`, transition: "width 0.1s linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
