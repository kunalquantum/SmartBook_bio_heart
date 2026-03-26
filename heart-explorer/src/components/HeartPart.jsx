// ============================================================
// components/HeartPart.jsx
// Renders a single anatomical part as a Three.js mesh
// ============================================================

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { getGeometryProps } from "../utils/geometryHelpers";

export function HeartPart({
  part,
  isSelected,
  isHovered,
  opacity,
  showLabel,
  onSelect,
  onHover,
  onUnhover,
}) {
  const meshRef = useRef();
  const [pulsePhase] = useState(() => Math.random() * Math.PI * 2);
  const geo = getGeometryProps(part.shape);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Pulse glow scale when selected
    if (isSelected) {
      const pulse = 1 + Math.sin(t * 3 + pulsePhase) * 0.04;
      meshRef.current.scale.setScalar(pulse);
    } else if (isHovered) {
      const pulse = 1 + Math.sin(t * 5) * 0.025;
      meshRef.current.scale.setScalar(pulse);
    } else {
      meshRef.current.scale.setScalar(1);
    }

    // Emissive intensity animation
    if (meshRef.current.material) {
      const targetEmissive = isSelected
        ? 0.7
        : isHovered
          ? 0.45
          : 0.08;
      const current = meshRef.current.material.emissiveIntensity;
      meshRef.current.material.emissiveIntensity +=
        (targetEmissive - current) * 0.12;
    }
  });

  const baseColor = new THREE.Color(part.color);
  const emissiveColor = new THREE.Color(part.emissive || part.color);

  return (
    <group
      position={part.position}
      scale={part.scale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(part.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        onHover(part.id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
        onUnhover();
      }}
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        {geo.type === "sphereGeometry" && (
          <sphereGeometry args={geo.args} />
        )}
        {geo.type === "cylinderGeometry" && (
          <cylinderGeometry args={geo.args} />
        )}
        {geo.type === "boxGeometry" && (
          <boxGeometry args={geo.args} />
        )}
        {geo.type === "torusGeometry" && (
          <torusGeometry args={geo.args} />
        )}

        <meshStandardMaterial
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={0.08}
          transparent
          opacity={opacity}
          roughness={0.45}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wireframe outline when selected */}
      {isSelected && (
        <mesh>
          {geo.type === "sphereGeometry" && (
            <sphereGeometry args={[geo.args[0] + 0.04, 24, 24]} />
          )}
          {geo.type === "cylinderGeometry" && (
            <cylinderGeometry
              args={[
                geo.args[0] + 0.04,
                geo.args[1] + 0.04,
                geo.args[2] + 0.08,
                20,
              ]}
            />
          )}
          {geo.type === "boxGeometry" && (
            <boxGeometry
              args={[
                geo.args[0] + 0.08,
                geo.args[1] + 0.08,
                geo.args[2] + 0.08,
              ]}
            />
          )}
          {geo.type === "torusGeometry" && (
            <torusGeometry args={[geo.args[0], geo.args[1] + 0.04, 12, 28]} />
          )}
          <meshBasicMaterial
            color={part.color}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      )}

      {/* Hover glow ring */}
      {(isHovered || isSelected) && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.62, 32]} />
          <meshBasicMaterial
            color={isSelected ? "#ffffff" : part.color}
            transparent
            opacity={isSelected ? 0.5 : 0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Label */}
      {(showLabel || isHovered || isSelected) && (
        <Text
          position={[0, 0.75, 0]}
          fontSize={0.18}
          color={isSelected ? "#ffffff" : isHovered ? "#ffe8a0" : "#e0d8cc"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {part.label}
        </Text>
      )}
    </group>
  );
}