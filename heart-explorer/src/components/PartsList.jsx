// ============================================================
// components/PartsList.jsx
// Left panel — grouped, clickable anatomy list
// ============================================================

import { HEART_PARTS, CATEGORIES, CATEGORY_LABELS } from "../data/heartParts";

const CATEGORY_ORDER = [
  CATEGORIES.CHAMBER,
  CATEGORIES.VESSEL,
  CATEGORIES.VALVE,
  CATEGORIES.WALL,
];

const CATEGORY_ICONS = {
  [CATEGORIES.CHAMBER]: "♥",
  [CATEGORIES.VESSEL]: "⟳",
  [CATEGORIES.VALVE]: "◈",
  [CATEGORIES.WALL]: "▬",
};

export function PartsList({ selectedId, hoveredId, onSelect }) {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    parts: HEART_PARTS.filter((p) => p.category === cat),
  }));

  return (
    <aside className="parts-list">
      <div className="panel-header">
        <span className="panel-icon">🫀</span>
        <div>
          <h2 className="panel-title">Anatomy</h2>
          <p className="panel-subtitle">14 structures</p>
        </div>
      </div>

      <div className="parts-scroll">
        {grouped.map(({ cat, parts }) => (
          <div key={cat} className="category-group">
            <div className="category-label">
              <span className="category-icon">{CATEGORY_ICONS[cat]}</span>
              {CATEGORY_LABELS[cat]}
            </div>
            {parts.map((part) => (
              <button
                key={part.id}
                className={`part-btn ${selectedId === part.id ? "selected" : ""} ${hoveredId === part.id ? "hovered" : ""
                  }`}
                onClick={() => onSelect(part.id)}
                style={{ "--part-color": part.color }}
              >
                <span
                  className="part-dot"
                  style={{ background: part.color }}
                />
                <span className="part-name">{part.label}</span>
                {selectedId === part.id && (
                  <span className="selected-indicator">●</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}