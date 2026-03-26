import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera } from '@react-three/drei';
import HeartPart from './HeartPart';
import { heartParts } from '../data/heartParts';

export default function HeartScene() {
  return (
    <div className="scene-container">
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }}>
        <PerspectiveCamera makeDefault />
        <OrbitControls makeDefault enableDamping />
        <Stage adjustCamera intensity={0.5}>
          <Suspense fallback={null}>
            {heartParts.map((part) => (
              <HeartPart key={part.id} {...part} />
            ))}
          </Suspense>
        </Stage>
      </Canvas>
    </div>
  );
}
