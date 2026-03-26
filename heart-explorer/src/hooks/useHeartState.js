import { useState, useCallback } from 'react';

export function useHeartState() {
  const [selectedPart, setSelectedPart] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [isIsolated, setIsIsolated] = useState(false);

  const resetState = useCallback(() => {
    setSelectedPart(null);
    setHoveredPart(null);
    setIsIsolated(false);
  }, []);

  return {
    selectedPart,
    setSelectedPart,
    hoveredPart,
    setHoveredPart,
    isIsolated,
    setIsIsolated,
    resetState,
  };
}
