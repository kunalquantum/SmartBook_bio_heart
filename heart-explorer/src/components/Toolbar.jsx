import React from 'react';

export default function Toolbar() {
  return (
    <header className="toolbar">
      <h1>Heart Explorer</h1>
      <div className="controls">
        <button>Rotate</button>
        <button>Zoom Reset</button>
      </div>
    </header>
  );
}
