// ============================================================
// utils/geometryHelpers.js
// Maps shape descriptors from heartParts data to Three.js args
// ============================================================

/**
 * Returns Three.js geometry component name + args for a given shape string.
 */
export function getGeometryProps(shape) {
  switch (shape) {
    case "sphere":
      return { type: "sphereGeometry", args: [0.5, 32, 32] };
    case "cone-sphere":
      return { type: "sphereGeometry", args: [0.5, 32, 24] };
    case "cylinder":
      return { type: "cylinderGeometry", args: [0.5, 0.5, 1, 24] };
    case "cylinder-arch":
      return { type: "cylinderGeometry", args: [0.5, 0.42, 1, 24] };
    case "disc":
      return { type: "cylinderGeometry", args: [0.5, 0.5, 0.18, 32] };
    case "wall":
      return { type: "boxGeometry", args: [1, 1, 1] };
    case "torus-cluster":
      return { type: "torusGeometry", args: [0.28, 0.14, 16, 32] };
    default:
      return { type: "sphereGeometry", args: [0.5, 24, 24] };
  }
}

/**
 * Lerp between two arrays element-wise (for smooth transitions).
 */
export function lerpArrays(a, b, t) {
  return a.map((v, i) => v + (b[i] - v) * t);
}