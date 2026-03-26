// ============================================================
// hooks/useHeartState.js
// Central state manager for the heart explorer
// ============================================================

import { useState, useCallback } from "react";
import { HEART_PARTS } from "../data/heartParts";

export function useHeartState() {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [isolatedId, setIsolatedId] = useState(null);
  const [showLabels, setShowLabels] = useState(true);
  const [cameraTarget, setCameraTarget] = useState(null);

  const selectPart = useCallback(
    (id) => {
      if (id === selectedId) {
        setSelectedId(null);
        setCameraTarget(null);
      } else {
        setSelectedId(id);
        const part = HEART_PARTS.find((p) => p.id === id);
        if (part) setCameraTarget(part.position);
      }
    },
    [selectedId]
  );

  const hoverPart = useCallback((id) => {
    setHoveredId(id);
  }, []);

  const isolatePart = useCallback((id) => {
    setIsolatedId((prev) => (prev === id ? null : id));
  }, []);

  const resetView = useCallback(() => {
    setSelectedId(null);
    setHoveredId(null);
    setIsolatedId(null);
    setCameraTarget(null);
  }, []);

  const toggleLabels = useCallback(() => {
    setShowLabels((v) => !v);
  }, []);

  const isVisible = useCallback(
    (id) => {
      if (!isolatedId) return true;
      return id === isolatedId;
    },
    [isolatedId]
  );

  const getOpacity = useCallback(
    (id) => {
      if (isolatedId && id !== isolatedId) return 0.0;
      if (selectedId && id !== selectedId) return 0.25;
      return 1.0;
    },
    [selectedId, isolatedId]
  );

  return {
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
    isVisible,
    getOpacity,
  };
}