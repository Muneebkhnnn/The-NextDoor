import { useRef } from "react";
import { gsap } from "../lib/gsap";

/**
 * A button/link that subtly pulls toward the cursor on hover, then
 * eases back to rest. Disabled automatically for touch/coarse pointers.
 */
export default function MagneticButton({
  as: Tag = "button",
  children,
  className = "",
  strength = 0.35,
  ...rest
}) {
  const ref = useRef(null);

  const handlePointerMove = (e) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handlePointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
