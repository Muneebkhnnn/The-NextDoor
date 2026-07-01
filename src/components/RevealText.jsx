import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Splits the wrapped text into lines/words and reveals them with a
 * clipped upward motion as the element scrolls into view.
 */
export default function RevealText({
  children,
  as: Tag = "div",
  className = "",
  split = "words",
  delay = 0,
  start = "top 85%",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const text = el.textContent;
    const tokens = split === "words" ? text.split(/(\s+)/) : [text];

    el.innerHTML = "";
    const spans = [];

    tokens.forEach((token) => {
      if (token.trim() === "") {
        el.appendChild(document.createTextNode(token));
        return;
      }
      const outer = document.createElement("span");
      outer.style.display = "inline-block";
      outer.style.overflow = "hidden";
      outer.style.verticalAlign = "top";

      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.textContent = token;
      inner.style.willChange = "transform";

      outer.appendChild(inner);
      el.appendChild(outer);
      spans.push(inner);
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.025,
          delay,
          scrollTrigger: {
            trigger: el,
            start,
          },
        }
      );
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  );
}
