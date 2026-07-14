import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { NAV_LINKS } from "../data/content";

const SOCIAL = [
  { label: "WhatsApp", href: "https://wa.me/919858325704?text=Hi%20Muneeb%2C%20I'd%20like%20to%20discuss%20a%20project.", symbol: "WH" },
  { label: "Instagram", href: "https://www.instagram.com/muneeb_khn__/", symbol: "IN" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muneeb-khan-1281b31bb/", symbol: "LI" },
];

const MARQUEE_ITEMS = [
  "Custom Websites",
  "UI/UX Design",
  "Business Growth",
  "E-commerce",
  "Fast Performance",
  "SEO Ready",
  "Modern Design",
  "Mobile First",
  "Maintenance & Support",
  "Built to Scale",
];

export default function Footer() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const totalWidth = el.scrollWidth / 2;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        x: -totalWidth,
        duration: 28,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % totalWidth}px`,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative overflow-hidden">
      {/* Marquee strip */}
      <div
        className="overflow-hidden border-b border-[var(--color-line)] py-4"
        aria-hidden="true"
      >
        <div ref={marqueeRef} className="flex w-max gap-12 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-5xl tracking-wide">
              <span className="text-[var(--color-cream)]">{item}</span>
              <span className="text-[var(--color-ember)]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#top" className="inline-block">
              <span className="font-display text-3xl tracking-wide text-[var(--color-cream)]">
                <span className="text-[var(--color-ember)] pr-2">The</span>
                <span>Next</span>
                <span className="text-[var(--color-ember)]">Door</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
              A small studio that builds fast, distinctive, conversion-ready web products — for
              ambitious teams who've outgrown templates.
            </p>
            <div className="mt-6 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[var(--color-teal)]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                Turning ideas into products
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)]">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-cream)] transition-colors hover:text-[var(--color-ember)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-sm text-[var(--color-cream)] transition-colors hover:text-[var(--color-ember)]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Social */}
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)]">
              Find us
            </p>
            <ul className="flex flex-col gap-3">
              {SOCIAL.map(({ label, href, symbol }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex items-center gap-3 text-sm text-[var(--color-cream)] transition-colors hover:text-[var(--color-ember)]"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded border border-[var(--color-line)] font-mono text-[10px] text-[var(--color-muted)] transition-colors group-hover:border-[var(--color-ember)] group-hover:text-[var(--color-ember)]">
                      {symbol}
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--color-line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-[var(--color-muted)]">
            © {new Date().getFullYear()} The NextDoor Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy policy", "Terms of service"].map((item) => (
              <a
                key={item}
                href="#top"
                className="font-mono text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-cream)]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
