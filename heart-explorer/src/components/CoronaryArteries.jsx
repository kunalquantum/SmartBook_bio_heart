// ============================================================
// components/CoronaryArteries.jsx
// Surface details: red (arteries) and blue (veins) paths
// ============================================================

import { useMemo } from "react";
import * as THREE from "three";

function ArteryBranch({ points, color, radius = 0.02 }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), [points]);
  
  return (
    <group>
      {/* Main Vessel */}
      <mesh castShadow>
        <tubeGeometry args={[curve, 20, radius, 8, false]} />
        <meshPhysicalMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.8}
          roughness={0.1}
          clearcoat={1}
        />
      </mesh>
      {/* Native Glow Halo */}
      <mesh>
        <tubeGeometry args={[curve, 20, radius * 2.2, 8, false]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.12} 
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export function CoronaryArteries() {
  const branches = [
    // Right Coronary Artery (Red)
    {
      color: "#ff2040",
      points: [[0.2, 0.8, 0.4], [0.5, 0.4, 0.6], [0.8, -0.2, 0.5], [0.6, -0.6, 0.3]],
      radius: 0.025
    },
    // Left Coronary Artery (Red)
    {
      color: "#ff2040",
      points: [[-0.3, 0.8, 0.3], [-0.6, 0.4, 0.4], [-0.9, -0.3, 0.2]],
      radius: 0.025
    },
    // Coronary Veins (Blue)
    {
      color: "#2060ff",
      points: [[0.1, 0.7, 0.5], [0.3, 0.2, 0.7], [0.5, -0.4, 0.6]],
      radius: 0.02
    },
    {
      color: "#2060ff",
      points: [[-0.2, 0.7, 0.4], [-0.4, 0.1, 0.6], [-0.6, -0.5, 0.4]],
      radius: 0.02
    }
  ];

  return (
    <group position={[0, -0.1, 0.2]} scale={[1.1, 1.1, 1.1]}>
      {branches.map((b, i) => (
        <ArteryBranch key={i} {...b} />
      ))}
    </group>
  );
}
