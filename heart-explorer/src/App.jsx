// ============================================================
// App.jsx
// Root component — wires all modules together
// ============================================================

import { Suspense } from "react";
import { PART_MAP } from "./data/heartParts";
import { useHeartState } from "./hooks/useHeartState";
import { HeartScene } from "./components/HeartScene";
import { PartsList } from "./components/PartsList";
import { InfoPanel } from "./components/InfoPanel";
import { Toolbar } from "./components/Toolbar";
import { HoverTooltip } from "./components/HoverTooltip";
import "./styles/app.css";

function SceneLoader() {
  return (
    <div style={{
      width: "100%", height: "100%", display: "flex",
      alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 16,
      color: "var(--text-muted)", fontSize: 14,
    }}>
      <div style={{ fontSize: 40, animation: "blink 1s infinite" }}>🫀</div>
      Loading 3D Heart…
    </div>
  );
}

export default function App() {
  const {
    selectedId,
    hoveredId,
    isolatedId,
    showLabels,
    cameraTarget,
    selectPart,
    hoverPart,
    isolatePart,
    resetView,
    toggleLabels,
    getOpacity,
  } = useHeartState();

  const selectedPart = selectedId ? PART_MAP[selectedId] : null;

  return (
    <div className="app">
      {/* ── Top Bar ── */}
      <Toolbar
        showLabels={showLabels}
        onToggleLabels={toggleLabels}
        onReset={resetView}
      />

      {/* ── Main Body ── */}
      <div className="app-body">

        {/* Left panel: anatomy list */}
        <PartsList
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={selectPart}
        />

        {/* Center: 3D canvas */}
        <div className="viewer-container">
          <div className="viewer-canvas">
            <Suspense fallback={<SceneLoader />}>
              <HeartScene
                selectedId={selectedId}
                hoveredId={hoveredId}
                showLabels={showLabels}
                cameraTarget={cameraTarget}
                getOpacity={getOpacity}
                onSelect={selectPart}
                onHover={hoverPart}
                onUnhover={() => hoverPart(null)}
              />
            </Suspense>
          </div>

          {/* Isolation mode banner */}
          {isolatedId && (
            <div className="isolated-banner">
              🔬 Isolated: {PART_MAP[isolatedId]?.label} — click "Show All" to restore
            </div>
          )}

          {/* Bottom overlay badges */}
          <div className="viewer-overlay">
            <span className={`overlay-badge ${isolatedId ? "active" : ""}`}>
              {isolatedId ? "Isolated Mode" : "Full View"}
            </span>
            {selectedPart && (
              <span className="overlay-badge active">{selectedPart.label} selected</span>
            )}
          </div>
        </div>

        {/* Right panel: info */}
        <InfoPanel
          selectedId={selectedId}
          isolatedId={isolatedId}
          onIsolate={isolatePart}
          onReset={resetView}
        />
      </div>

      {/* Floating tooltip on hover */}
      <HoverTooltip hoveredId={hoveredId} />
    </div>
  );
}