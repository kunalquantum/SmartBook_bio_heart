import * as THREE from "three";

/**
 * Generates organic-looking points for LatheGeometry.
 * Creates a tapering, slightly bulging profile.
 */
export function getLathePoints(vesselType) {
  const points = [];
  const segments = 12;
  for (let i = 0; i < segments; i++) {
    const t = i / (segments - 1);
    // Organic bulge/taper logic
    let radius = 0.5;
    if (vesselType === "aorta") {
      radius = 0.45 + Math.sin(t * Math.PI) * 0.12; // Middle bulge
    } else if (vesselType === "vena-cava") {
      radius = 0.4 + t * 0.15; // Tapering
    } else {
      radius = 0.4 + Math.sin(t * Math.PI * 2) * 0.05;
    }
    points.push(new THREE.Vector2(radius, (t - 0.5) * 2));
  }
  return points;
}

/**
 * Returns Three.js geometry component name + args for a given shape string.
 */
export function getGeometryProps(shape) {
  switch (shape) {
    case "sphere":
      return { type: "sphereGeometry", args: [0.5, 32, 32] };
    case "organic-chamber":
      return { type: "sphereGeometry", args: [0.5, 48, 32] };
    case "lathe-vessel":
      return { type: "latheGeometry" }; // Needs points
    case "cylinder":
      return { type: "cylinderGeometry", args: [0.5, 0.5, 1, 32] };
    case "cylinder-arch":
      return { type: "cylinderGeometry", args: [0.5, 0.42, 1, 32] };
    case "disc":
      return { type: "torusGeometry", args: [0.35, 0.08, 16, 32, Math.PI * 1.5] }; // Flappy segment
    case "wall":
      return { type: "boxGeometry", args: [1, 1, 1] };
    case "torus-cluster":
      return { type: "torusGeometry", args: [0.28, 0.14, 24, 48] };
    case "artery-segment":
      return { type: "tubeGeometry", args: [1, 12, 0.08, 8, false] };
    default:
      return { type: "sphereGeometry", args: [0.5, 32, 32] };
  }
}

/**
 * Lerp between two arrays element-wise (for smooth transitions).
 */
export function lerpArrays(a, b, t) {
  return a.map((v, i) => v + (b[i] - v) * t);
}