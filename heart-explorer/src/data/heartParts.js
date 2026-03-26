// ============================================================
// data/heartParts.js
// All 14 anatomical parts with metadata, colors, geometry hints
// ============================================================

export const CATEGORIES = {
  CHAMBER: "chamber",
  VESSEL: "vessel",
  VALVE: "valve",
  WALL: "wall",
};

export const HEART_PARTS = [
  // ── Chambers ──────────────────────────────────────────────
  {
    id: "right_atrium",
    label: "Right Atrium",
    category: CATEGORIES.CHAMBER,
    color: "#e07b88",
    emissive: "#c0485a",
    position: [0.9, 0.55, 0.1],
    scale: [0.85, 0.7, 0.75],
    shape: "organic-chamber",
    function:
      "Receives deoxygenated blood returning from the body via the vena cavae and pumps it into the right ventricle.",
    location: "Upper-right chamber of the heart.",
    fact: "Its wall is thinner than the ventricles since it only pumps blood a short distance.",
    connectedTo: ["Superior Vena Cava", "Inferior Vena Cava", "Tricuspid Valve"],
  },
  {
    id: "left_atrium",
    label: "Left Atrium",
    category: CATEGORIES.CHAMBER,
    color: "#c94f6a",
    emissive: "#a02040",
    position: [-0.85, 0.6, -0.1],
    scale: [0.8, 0.65, 0.7],
    shape: "organic-chamber",
    function:
      "Receives oxygenated blood from the pulmonary veins and passes it to the left ventricle.",
    location: "Upper-left chamber of the heart.",
    fact: "It is the most posterior chamber of the heart, lying closest to the spine.",
    connectedTo: ["Pulmonary Veins", "Mitral Valve"],
  },
  {
    id: "right_ventricle",
    label: "Right Ventricle",
    category: CATEGORIES.CHAMBER,
    color: "#d46275",
    emissive: "#b03050",
    position: [0.7, -0.35, 0.25],
    scale: [1.0, 0.9, 0.85],
    shape: "organic-chamber",
    function:
      "Pumps deoxygenated blood to the lungs through the pulmonary artery for oxygenation.",
    location: "Lower-right chamber, beneath the right atrium.",
    fact: "Its wall is thinner than the left ventricle because it pumps against lower pulmonary resistance.",
    connectedTo: ["Tricuspid Valve", "Pulmonary Valve", "Pulmonary Artery"],
  },
  {
    id: "left_ventricle",
    label: "Left Ventricle",
    category: CATEGORIES.CHAMBER,
    color: "#b83055",
    emissive: "#8c1030",
    position: [-0.65, -0.4, -0.15],
    scale: [0.95, 1.05, 0.9],
    shape: "organic-chamber",
    function:
      "Pumps oxygenated blood to the entire body through the aorta. The main pumping chamber.",
    location: "Lower-left chamber, the largest and most muscular.",
    fact: "It generates about 5 times more pressure than the right ventricle to push blood around the body.",
    connectedTo: ["Mitral Valve", "Aortic Valve", "Aorta"],
  },

  // ── Major Blood Vessels ───────────────────────────────────
  {
    id: "aorta",
    label: "Aorta",
    category: CATEGORIES.VESSEL,
    color: "#e03030",
    emissive: "#b01010",
    position: [-0.3, 1.35, 0.1],
    scale: [0.35, 0.75, 0.35],
    rotation: [0, 0, Math.PI / 2.5], // Arch effect
    shape: "lathe-vessel",
    vesselSubtype: "aorta",
    function:
      "The largest artery in the body. Carries oxygen-rich blood from the left ventricle to all organs and tissues.",
    location: "Emerges from the top of the left ventricle and arches over the heart.",
    fact: "The aorta is approximately 2.5 cm wide and about 30 cm long.",
    connectedTo: ["Left Ventricle", "Aortic Valve"],
  },
  {
    id: "pulmonary_artery",
    label: "Pulmonary Artery",
    category: CATEGORIES.VESSEL,
    color: "#5580cc",
    emissive: "#2255aa",
    position: [0.35, 1.2, 0.35],
    scale: [0.32, 0.65, 0.32],
    shape: "lathe-vessel",
    vesselSubtype: "standard",
    function:
      "Carries deoxygenated blood from the right ventricle to the lungs to pick up oxygen.",
    location: "Exits from the top of the right ventricle, in front of the aorta.",
    fact: "Uniquely, it is the only artery that carries deoxygenated blood — opposite to all other arteries.",
    connectedTo: ["Right Ventricle", "Pulmonary Valve"],
  },
  {
    id: "pulmonary_veins",
    label: "Pulmonary Veins",
    category: CATEGORIES.VESSEL,
    color: "#cc3355",
    emissive: "#aa1133",
    position: [-1.05, 0.45, -0.45],
    scale: [0.5, 0.3, 0.3],
    shape: "torus-cluster",
    function:
      "Return oxygenated blood from the lungs to the left atrium. There are four pulmonary veins.",
    location: "Enter the back of the left atrium from the lungs on both sides.",
    fact: "Uniquely, pulmonary veins are the only veins that carry oxygenated blood.",
    connectedTo: ["Left Atrium"],
  },
  {
    id: "superior_vena_cava",
    label: "Superior Vena Cava",
    category: CATEGORIES.VESSEL,
    color: "#4466bb",
    emissive: "#1133aa",
    position: [1.05, 0.95, 0.0],
    scale: [0.28, 0.65, 0.28],
    rotation: [0, 0, -0.1],
    shape: "lathe-vessel",
    vesselSubtype: "vena-cava",
    function:
      "Returns deoxygenated blood from the upper body (head, arms, upper chest) to the right atrium.",
    location: "Enters the top of the right atrium from above.",
    fact: "It is about 7 cm long and 2 cm in diameter.",
    connectedTo: ["Right Atrium"],
  },
  {
    id: "inferior_vena_cava",
    label: "Inferior Vena Cava",
    category: CATEGORIES.VESSEL,
    color: "#3355aa",
    emissive: "#112299",
    position: [1.0, -0.55, 0.05],
    scale: [0.3, 0.6, 0.3],
    shape: "lathe-vessel",
    vesselSubtype: "vena-cava",
    function:
      "Returns deoxygenated blood from the lower body (abdomen, legs, pelvis) to the right atrium.",
    location: "Enters the bottom of the right atrium from below.",
    fact: "It is the largest vein in the human body.",
    connectedTo: ["Right Atrium"],
  },

  // ── Valves ────────────────────────────────────────────────
  {
    id: "tricuspid_valve",
    label: "Tricuspid Valve",
    category: CATEGORIES.VALVE,
    color: "#e8c87a",
    emissive: "#c0a030",
    position: [0.82, 0.08, 0.18],
    scale: [0.65, 0.65, 0.65],
    rotation: [Math.PI / 2, 0, 0.4],
    shape: "disc",
    function:
      "Controls blood flow from the right atrium to the right ventricle. Has three leaflets.",
    location: "Between the right atrium and right ventricle.",
    fact: "It is the largest of the four heart valves.",
    connectedTo: ["Right Atrium", "Right Ventricle"],
  },
  {
    id: "mitral_valve",
    label: "Mitral Valve",
    category: CATEGORIES.VALVE,
    color: "#d4b860",
    emissive: "#b09020",
    position: [-0.72, 0.05, -0.12],
    scale: [0.6, 0.6, 0.6],
    rotation: [Math.PI / 2, 0, -0.3],
    shape: "disc",
    function:
      "Controls blood flow from the left atrium to the left ventricle. Has only two leaflets.",
    location: "Between the left atrium and left ventricle.",
    fact: "Also called the bicuspid valve — named after a bishop's mitre hat due to its two-leaflet shape.",
    connectedTo: ["Left Atrium", "Left Ventricle"],
  },
  {
    id: "pulmonary_valve",
    label: "Pulmonary Valve",
    category: CATEGORIES.VALVE,
    color: "#e0d090",
    emissive: "#c0b050",
    position: [0.35, 0.75, 0.3],
    scale: [0.45, 0.45, 0.45],
    rotation: [0, 0, 0],
    shape: "disc",
    function:
      "Prevents backflow of blood from the pulmonary artery into the right ventricle between heartbeats.",
    location: "At the base of the pulmonary artery.",
    fact: "It is a semilunar valve — shaped like half-moons — like the aortic valve.",
    connectedTo: ["Right Ventricle", "Pulmonary Artery"],
  },
  {
    id: "aortic_valve",
    label: "Aortic Valve",
    category: CATEGORIES.VALVE,
    color: "#f0e098",
    emissive: "#d0c060",
    position: [-0.28, 0.72, 0.1],
    scale: [0.28, 0.14, 0.28],
    shape: "disc",
    function:
      "Prevents blood from flowing back into the left ventricle from the aorta after the heart beats.",
    location: "At the base of the aorta, between the left ventricle and aorta.",
    fact: "The most commonly replaced heart valve in cardiac surgery.",
    connectedTo: ["Left Ventricle", "Aorta"],
  },

  // ── Wall / Divider ────────────────────────────────────────
  {
    id: "septum",
    label: "Septum",
    category: CATEGORIES.WALL,
    color: "#c0a0a8",
    emissive: "#906080",
    position: [0.08, 0.0, 0.0],
    scale: [0.12, 1.5, 0.9],
    shape: "wall",
    function:
      "The muscular wall dividing the left and right sides of the heart, preventing mixing of oxygenated and deoxygenated blood.",
    location: "Central dividing wall running vertically through the heart.",
    fact: "A hole in the septum (septal defect) is one of the most common congenital heart defects.",
    connectedTo: ["All four chambers"],
  },
];

export const PART_MAP = Object.fromEntries(HEART_PARTS.map((p) => [p.id, p]));

export const CATEGORY_LABELS = {
  [CATEGORIES.CHAMBER]: "Chambers",
  [CATEGORIES.VESSEL]: "Blood Vessels",
  [CATEGORIES.VALVE]: "Valves",
  [CATEGORIES.WALL]: "Wall",
};