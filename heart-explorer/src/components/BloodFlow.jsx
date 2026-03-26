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
    const t = state.clock.getElapsedTime();

    // Lub-Dub Pulsing speed (Match HeartPart logic) 
    // Synchronized spurt during ventricular contraction
    const beatCycle = t * 1.6;
    const phase = (beatCycle - 0.4) % (Math.PI * 2); 
    const pulseFactor = 1 + Math.max(0, Math.sin(phase * 2)) * 2.5;

    particles.forEach((p, i) => {
      // Advance position along curve with pulseFactor
      p.t = (p.t + delta * speed * pulseFactor) % 1;
      
      const pos = curve.getPointAt(p.t);
      dummy.position.copy(pos).add(p.offset);
      
      // Dynamic scaling: stretch particles slightly when moving fast
      const s = size * (1 + (pulseFactor - 1) * 0.2);
      dummy.scale.set(s, s * (1 + (pulseFactor - 1) * 0.4), s);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshPhysicalMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.4}
        transparent 
        opacity={0.7} 
        roughness={0.1}
        clearcoat={1}
        transmission={0.3}
        thickness={0.2}
      />
    </instancedMesh>
  );
}

export function BloodFlow() {
  const flows = [
    // Deoxygenated Path (Impure): Vena Cava -> RA -> RV -> Pulmonary Artery
    {
      color: "#441166", // Dark venous purple
      points: [[1.05, 1.2, 0.1], [0.9, 0.5, 0.1], [0.8, 0.1, 0.2], [0.6, -0.4, 0.2], [0.35, 0.8, 0.35], [0.35, 1.5, 0.4]],
      count: 35,
      speed: 0.15,
      size: 0.05
    },
    // Oxygenated Path (Pure): Pulm Veins -> LA -> LV -> Aorta
    {
      color: "#ff1122", // Bright arterial red
      points: [[-1.1, 0.5, -0.4], [-0.8, 0.5, -0.1], [-0.7, 0.1, -0.1], [-0.6, -0.5, -0.1], [-0.3, 0.8, 0.1], [-0.3, 1.8, 0.1]],
      count: 35,
      speed: 0.18,
      size: 0.05
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
