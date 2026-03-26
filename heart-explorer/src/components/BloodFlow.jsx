// ============================================================
// components/BloodFlow.jsx
// Visualizes blood circulation using moving particles
// ============================================================

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FlowParticles({ count = 20, points, color, speed = 0.5, size = 0.08 }) {
  const meshRef = useRef();
  
  // Create a curve from points
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  }, [points]);

  // Particle positions and random offsets
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      t: Math.random(), // Start at random position on curve
      offset: new THREE.Vector3(
        (Math.random() - 0.5) * 0.15,
        (Math.random() - 0.5) * 0.15,
        (Math.random() - 0.5) * 0.15
      )
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      // Advance position along curve
      p.t = (p.t + delta * speed) % 1;
      
      const pos = curve.getPointAt(p.t);
      dummy.position.copy(pos).add(p.offset);
      dummy.scale.setScalar(Math.sin(p.t * Math.PI) * 0.5 + 0.5); // Fade in/out at ends
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
}

export function BloodFlow() {
  const flows = [
    // Deoxygenated Path (Blue): Vena Cava -> RA -> RV -> Pulmonary Artery
    {
      color: "#2080ff",
      points: [[1.05, 1.2, 0.1], [0.9, 0.5, 0.1], [0.8, 0.1, 0.2], [0.6, -0.4, 0.2], [0.35, 0.8, 0.35], [0.35, 1.5, 0.4]],
      count: 25,
      speed: 0.4
    },
    // Oxygenated Path (Red): Pulm Veins -> LA -> LV -> Aorta
    {
      color: "#ff3030",
      points: [[-1.1, 0.5, -0.4], [-0.8, 0.5, -0.1], [-0.7, 0.1, -0.1], [-0.6, -0.5, -0.1], [-0.3, 0.8, 0.1], [-0.3, 1.8, 0.1]],
      count: 25,
      speed: 0.5
    }
  ];

  return (
    <group>
      {flows.map((f, i) => (
        <FlowParticles key={i} {...f} />
      ))}
    </group>
  );
}
