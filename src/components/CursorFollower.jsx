import { useEffect, useState } from "react";

const CURSOR_SIZE = 40;
const HOTSPOT_X = 30;
const HOTSPOT_Y = 18;

export default function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    if (!mq.matches) return;

    const onMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-110 select-none will-change-transform"
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        transform: `translate3d(${position.x - HOTSPOT_X}px, ${position.y - HOTSPOT_Y}px, 0)`,
        transition: "transform 120ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      aria-hidden="true"
    >
      <img
        src="/cursor-svgrepo-com%20(1).svg"
        alt=""
        className="block h-full w-full"
        draggable="false"
      />
    </div>
  );
}
