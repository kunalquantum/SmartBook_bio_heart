// ============================================================
// components/HeartScene.jsx
// Three.js scene: lighting, camera, orbit controls, all parts
// ============================================================

import { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";
import { HEART_PARTS } from "../data/heartParts";
import { HeartPart } from "./HeartPart";

// ── Camera animator ──────────────────────────────────────────
function CameraAnimator({ target }) {
  const { camera } = useThree();
  const targetRef = useRef(null);

  useEffect(() => {
    if (target) {
      targetRef.current = new THREE.Vector3(...target);
    } else {
      targetRef.current = null;
    }
  }, [target]);

  useFrame(() => {
    if (!targetRef.current) return;
    camera.position.lerp(
      new THREE.Vector3(
        targetRef.current.x * 0.6 + 3.5,
        targetRef.current.y * 0.5 + 1.5,
        targetRef.current.z * 0.5 + 4.5
      ),
      0.05
    );
  });

  return null;
}

// ── Ambient heart glow core ──────────────────────────────────
function HeartCore() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.material.opacity = 0.04 + Math.sin(t * 1.5) * 0.015;
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.6, 32, 32]} />
      <meshBasicMaterial color="#cc2244" transparent opacity={0.04} side={THREE.BackSide} />
    </mesh>
  );
}

// ── Main scene ───────────────────────────────────────────────
function SceneContent({
  selectedId,
  hoveredId,
  showLabels,
  cameraTarget,
  getOpacity,
  onSelect,
  onHover,
  onUnhover,
}) {
  return (
    <>
      <CameraAnimator target={cameraTarget} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        color="#ffe8e0"
      />
      <directionalLight position={[-4, -3, -4]} intensity={0.5} color="#4488cc" />
      <pointLight position={[0, 3, 3]} intensity={0.8} color="#ff6688" distance={8} />
      <pointLight position={[0, -3, -3]} intensity={0.5} color="#4466bb" distance={8} />

      <HeartCore />
      <Stars radius={30} depth={20} count={800} factor={2} saturation={0.3} fade />

      {/* All 14 anatomical parts */}
      {HEART_PARTS.map((part) => (
        <HeartPart
          key={part.id}
          part={part}
          isSelected={selectedId === part.id}
          isHovered={hoveredId === part.id}
          opacity={getOpacity(part.id)}
          showLabel={showLabels}
          onSelect={onSelect}
          onHover={onHover}
          onUnhover={onUnhover}
        />
      ))}

      {/* Click background to deselect */}
      <mesh
        visible={false}
        onClick={() => onSelect(null)}
        position={[0, 0, -5]}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial />
      </mesh>

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
        zoomSpeed={0.8}
        minDistance={3}
        maxDistance={12}
        makeDefault
      />
    </>
  );
}

// ── Canvas wrapper ───────────────────────────────────────────
export function HeartScene(props) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 7], fov: 50 }}
      shadows
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <SceneContent {...props} />
    </Canvas>
  );
}