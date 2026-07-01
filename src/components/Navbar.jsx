import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { NAV_LINKS } from "../data/content";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.1 }
    );
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (open) {
      gsap.set(menu, { display: "flex" });
      gsap.fromTo(
        menu,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power4.inOut" }
      );
      gsap.fromTo(
        menu.querySelectorAll("[data-menu-item]"),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.2, ease: "power3.out" }
      );
    } else {
      gsap.to(menu, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
  }, [open]);

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-[var(--color-ink)]/85 backdrop-blur-md border-b border-[var(--color-line)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#top" className="group flex items-center gap-2" data-cursor="home">
          <span className="font-display text-2xl tracking-wide text-[var(--color-cream)]">
            FORGE<span className="text-[var(--color-ember)]">WORKS</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="view"
              className="font-mono text-[13px] uppercase tracking-wider text-[var(--color-muted)] transition-colors hover:text-[var(--color-cream)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <MagneticButton
            as="a"
            href="#contact"
            data-cursor="let's talk"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ember)] px-5 py-2 font-mono text-[13px] uppercase tracking-wider text-[var(--color-cream)] transition-colors hover:bg-[var(--color-ember)] hover:text-[var(--color-ink)]"
          >
            Start a project
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-10 flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-[1.5px] w-6 bg-[var(--color-cream)] transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-[var(--color-cream)] transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        ref={menuRef}
        className="hidden w-full flex-col gap-1 border-t border-[var(--color-line)] bg-[var(--color-ink)] px-6 pb-8 pt-4 md:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            data-menu-item
            href={link.href}
            onClick={() => setOpen(false)}
            className="border-b border-[var(--color-line)] py-4 font-display text-3xl tracking-wide text-[var(--color-cream)]"
          >
            {link.label}
          </a>
        ))}
        <a
          data-menu-item
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-ember)] px-5 py-2 font-mono text-[13px] uppercase tracking-wider text-[var(--color-cream)]"
        >
          Start a project
        </a>
      </div>
    </header>
  );
}
