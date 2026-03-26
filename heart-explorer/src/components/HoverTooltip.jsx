import { useEffect, useRef, useState } from "react";
import { PART_MAP } from "../data/heartParts";

export function HoverTooltip({ hoveredId }) {
  const ref = useRef();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX + 14, y: e.clientY - 10 });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const part = hoveredId ? PART_MAP[hoveredId] : null;
  if (!part) return null;

  return (
    <div
      ref={ref}
      className="hover-tooltip"
      style={{
        left: pos.x,
        top: pos.y,
        "--part-color": part.color,
      }}
    >
      <span
        className="tooltip-dot"
        style={{ background: part.color }}
      />
      {part.label}
    </div>
  );
}