import React from 'react';
import { heartParts } from '../data/heartParts';

export default function PartsList() {
  return (
    <aside className="sidebar parts-list">
      <h3>Heart Anatomy</h3>
      <ul>
        {heartParts.map((part) => (
          <li key={part.id}>{part.name}</li>
        ))}
      </ul>
    </aside>
  );
}
