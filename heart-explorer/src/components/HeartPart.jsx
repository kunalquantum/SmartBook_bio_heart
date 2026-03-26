import React from 'react';

export default function HeartPart({ id, name, color, position }) {
  // Logic for glowing, pulsing, and clicking
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} /> 
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
