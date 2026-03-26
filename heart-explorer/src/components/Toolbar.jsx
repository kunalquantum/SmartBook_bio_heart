// ============================================================
// components/Toolbar.jsx
// Top bar with app title + controls
// ============================================================

export function Toolbar({ showLabels, onToggleLabels, onReset }) {
  return (
    <header className="toolbar">
      <div className="toolbar-brand">
        <span className="brand-icon">🫀</span>
        <div>
          <h1 className="brand-title">Heart Explorer</h1>
          <p className="brand-sub">Interactive 3D Anatomy</p>
        </div>
      </div>

      <div className="toolbar-controls">
        <button
          className={`ctrl-btn ${showLabels ? "active" : ""}`}
          onClick={onToggleLabels}
          title="Toggle labels"
        >
          <span>🏷️</span>
          <span className="ctrl-label">{showLabels ? "Labels On" : "Labels Off"}</span>
        </button>

        <button className="ctrl-btn" onClick={onReset} title="Reset view">
          <span>↺</span>
          <span className="ctrl-label">Reset</span>
        </button>

        <div className="ctrl-hint">
          <span>Drag</span> to rotate · <span>Scroll</span> to zoom
        </div>
      </div>
    </header>
  );
}