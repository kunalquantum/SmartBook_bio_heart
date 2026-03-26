// ============================================================
// components/InfoPanel.jsx
// Right panel — shows details of the selected anatomy part
// ============================================================

import { PART_MAP, CATEGORY_LABELS } from "../data/heartParts";

const CATEGORY_BADGE_COLORS = {
  chamber: { bg: "#4a1520", text: "#ff8098", border: "#7a2535" },
  vessel: { bg: "#0f1e40", text: "#7aadff", border: "#1e3a6a" },
  valve: { bg: "#2a200a", text: "#ffd070", border: "#5a4010" },
  wall: { bg: "#1e1520", text: "#c0a0b8", border: "#4a3055" },
};

export function InfoPanel({ selectedId, isolatedId, onIsolate, onReset }) {
  const part = selectedId ? PART_MAP[selectedId] : null;
  const badge = part ? CATEGORY_BADGE_COLORS[part.category] : null;

  return (
    <aside className="info-panel">
      <div className="panel-header">
        <span className="panel-icon">📋</span>
        <div>
          <h2 className="panel-title">Info</h2>
          <p className="panel-subtitle">
            {part ? "Part selected" : "Click any part"}
          </p>
        </div>
      </div>

      {!part ? (
        <div className="info-empty">
          <div className="empty-icon">🫀</div>
          <p className="empty-title">Select a structure</p>
          <p className="empty-hint">
            Click on any heart part in the 3D view or from the anatomy list to see detailed information.
          </p>
          <div className="hint-list">
            <div className="hint-item">
              <span>👆</span> Click to select
            </div>
            <div className="hint-item">
              <span>🖱️</span> Drag to rotate
            </div>
            <div className="hint-item">
              <span>🔍</span> Scroll to zoom
            </div>
          </div>
        </div>
      ) : (
        <div className="info-content">
          {/* Part name + badge */}
          <div className="info-name-block">
            <div
              className="info-color-bar"
              style={{ background: part.color }}
            />
            <div>
              <h3 className="info-name">{part.label}</h3>
              <div
                className="info-category-badge"
                style={{
                  background: badge.bg,
                  color: badge.text,
                  borderColor: badge.border,
                }}
              >
                {CATEGORY_LABELS[part.category]}
              </div>
            </div>
          </div>

          {/* Function */}
          <div className="info-section">
            <div className="info-section-label">Function</div>
            <p className="info-section-text">{part.function}</p>
          </div>

          {/* Location */}
          <div className="info-section">
            <div className="info-section-label">Location</div>
            <p className="info-section-text">{part.location}</p>
          </div>

          {/* Connections */}
          <div className="info-section">
            <div className="info-section-label">Connected to</div>
            <div className="connections-list">
              {part.connectedTo.map((c) => (
                <span key={c} className="connection-chip">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Fact */}
          {part.fact && (
            <div className="info-fact">
              <div className="fact-label">💡 Did you know?</div>
              <p className="fact-text">{part.fact}</p>
            </div>
          )}

          {/* Isolate button */}
          <button
            className={`isolate-btn ${isolatedId === part.id ? "active" : ""}`}
            onClick={() => onIsolate(part.id)}
          >
            {isolatedId === part.id ? "👁 Show All Parts" : "🔬 Isolate This Part"}
          </button>
        </div>
      )}

      {/* Reset always visible at bottom */}
      <div className="panel-footer">
        <button className="reset-btn" onClick={onReset}>
          ↺ Reset View
        </button>
      </div>
    </aside>
  );
}