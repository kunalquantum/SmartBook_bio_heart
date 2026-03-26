import React from 'react';

export default function HoverTooltip({ partName, position }) {
  if (!partName) return null;
  
  return (
    <div className="tooltip" style={{ left: position?.x, top: position?.y }}>
      {partName}
    </div>
  );
}
