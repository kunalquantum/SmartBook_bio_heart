import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { getGeometryProps, getLathePoints } from "../utils/geometryHelpers";

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

  // Memoize lathe points if needed
  const lathePoints = useMemo(() => {
    if (part.shape === "lathe-vessel") {
      return getLathePoints(part.vesselSubtype || "standard");
    }
    return null;
  }, [part.shape, part.vesselSubtype]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // ── Lub-Dub Heartbeat Animation ──────────────────────────
    const isChamber = part.category === "chamber";
    const isAtrium = part.id.includes("atrium");
    const isVentricle = part.id.includes("ventricle");
    
    // ── Contractile Distortion (Active Squeezing) ────────────
    let scaleX = 1;
    let scaleY = 1;
    let scaleZ = 1;
    let pulse = 1;

    if (isChamber) {
      const beatCycle = t * 1.6;
      const phase = beatCycle % (Math.PI * 2);
      
      if (isAtrium) {
        pulse = 1 + Math.max(0, Math.sin(phase * 2)) * 0.05;
        // Atrial squeeze: contract along Y, expand XZ slightly
        scaleY = 1 - (pulse - 1) * 1.5;
        scaleX = scaleZ = 1 + (pulse - 1) * 0.5;
      } else if (isVentricle) {
        const vPhase = (beatCycle - 0.4) % (Math.PI * 2);
        pulse = 1 + Math.max(0, Math.sin(vPhase * 2)) * 0.08;
        // Ventricular squeeze: power contraction from sides
        scaleX = scaleZ = 1 - (pulse - 1) * 1.2;
        scaleY = 1 + (pulse - 1) * 0.6;
      }
    }

    // ── Surface Noise Distortion ──────────────────────────────
    // Remove "mechanical" perfection with subtle vertex noise
    if (meshRef.current.geometry.attributes.position) {
       const pos = meshRef.current.geometry.attributes.position;
       const v = new THREE.Vector3();
       for (let i = 0; i < pos.count; i++) {
         v.fromBufferAttribute(pos, i);
         // Simulate Perlin-like noise using trig functions
         const noise = Math.sin(v.x * 5 + t) * Math.sin(v.y * 5 + t) * Math.sin(v.z * 5 + t) * 0.004;
         v.addScaledVector(v.normalize(), noise);
         pos.setXYZ(i, v.x, v.y, v.z);
       }
       pos.needsUpdate = true;
    }

    if (isSelected) {
      pulse *= 1 + Math.sin(t * 4) * 0.03;
    } else if (isHovered) {
      pulse *= 1.05;
    }
    
    meshRef.current.scale.lerp(new THREE.Vector3(pulse * scaleX, pulse * scaleY, pulse * scaleZ), 0.15);

    // ── Wet Surface Animation ────────────────────────────────
    if (meshRef.current.material) {
      const targetEmissive = isSelected ? 0.8 : isHovered ? 0.5 : 0.12 + (pulse - 1) * 2;
      meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        meshRef.current.material.emissiveIntensity,
        targetEmissive,
        0.1
      );
      
      // Animate wetness
      meshRef.current.material.roughness = 0.2 + Math.sin(t * 0.5 + pulsePhase) * 0.05;
      meshRef.current.material.clearcoat = 0.7 + Math.sin(t * 0.8) * 0.1;
    }
  });

  const baseColor = new THREE.Color(part.color);
  const emissiveColor = new THREE.Color(part.emissive || part.color);

  return (
    <group
      position={part.position}
      scale={part.scale}
      rotation={part.rotation || [0, 0, 0]}
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
      {/* ── Main Mesh ── */}
      <mesh ref={meshRef} castShadow receiveShadow>
        {part.shape === "organic-chamber" && (
          <sphereGeometry args={[0.5, 48, 32]} />
        )}
        {part.shape === "lathe-vessel" && (
          <latheGeometry args={[lathePoints, 32]} />
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
        {geo.type === "sphereGeometry" && part.shape !== "organic-chamber" && (
          <sphereGeometry args={geo.args} />
        )}

        <meshPhysicalMaterial
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={0.15}
          transparent
          opacity={opacity}
          roughness={0.15}
          metalness={0.05}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          sheen={1.5}
          sheenColor={baseColor}
          thickness={0.8}
          transmission={0.3}
          ior={1.45}
          attenuationDistance={0.5}
          attenuationColor={new THREE.Color("#ff4444")}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Muscle Striations (Biological Texture) ── */}
      {part.category === "chamber" && (
        <mesh scale={[1.01, 1.01, 1.01]}>
          <sphereGeometry args={[0.5, 32, 24]} />
          <meshBasicMaterial 
            color={part.color} 
            wireframe 
            transparent 
            opacity={0.08} 
            depthWrite={false}
          />
        </mesh>
      )}

      {/* ── Additional Organic "Lumps" for Chambers ── */}
      {part.shape === "organic-chamber" && (
        <group scale={[0.8, 0.8, 0.8]} position={[0.1, -0.1, 0]}>
           <mesh>
             <sphereGeometry args={[0.5, 24, 24]} />
             <meshPhysicalMaterial color={baseColor} transparent opacity={opacity * 0.8} roughness={0.4} />
           </mesh>
        </group>
      )}

      {/* Wireframe outline when selected */}
      {isSelected && (
        <mesh scale={[1.05, 1.05, 1.05]}>
           {part.shape === "lathe-vessel" ? (
             <latheGeometry args={[lathePoints, 20]} />
           ) : (
             <sphereGeometry args={[0.52, 24, 24]} />
           )}
          <meshBasicMaterial
            color={part.color}
            wireframe
            transparent
            opacity={0.3}
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