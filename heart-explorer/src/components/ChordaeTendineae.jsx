// ============================================================
// components/ChordaeTendineae.jsx
// Visualizes "heart strings" inside ventricles
// ============================================================

import { useMemo } from "react";
import * as THREE from "three";

function StringGroup({ position, color = "#ffcccc" }) {
  const count = 6;
  const strings = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const start = new THREE.Vector3(Math.cos(angle) * 0.15, 0.4, Math.sin(angle) * 0.15);
      const end = new THREE.Vector3(Math.cos(angle) * 0.35, -0.4, Math.sin(angle) * 0.35);
      return new THREE.CatmullRomCurve3([start, end]);
    });
  }, [count]);

  return (
    <group position={position}>
      {strings.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 8, 0.005, 4, false]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export function ChordaeTendineae() {
  return (
    <group>
      {/* Right Ventricle Strings */}
      <StringGroup position={[0.65, -0.4, 0.2]} color="#ffb0b0" />
      {/* Left Ventricle Strings */}
      <StringGroup position={[-0.6, -0.45, -0.1]} color="#ff9090" />
    </group>
  );
}
