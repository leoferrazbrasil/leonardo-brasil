import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAssistantStore } from '../store/assistantStore';

function ParticleOrb() {
  const status = useAssistantStore((state) => state.status);
  const submitCommand = useAssistantStore((state) => state.submitCommand);
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const positions = useMemo(() => {
    const count = 1800;
    const buffer = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 1.45 + Math.random() * 0.08;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      buffer[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      buffer[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      buffer[index * 3 + 2] = radius * Math.cos(phi);
    }

    return buffer;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current || !materialRef.current) {
      return;
    }

    const speed = status === 'thinking' ? 0.9 : status === 'speaking' ? 0.65 : status === 'listening' ? 0.45 : 0.2;
    const color = status === 'listening' ? '#ff3f6c' : status === 'thinking' ? '#7c3cff' : '#ff6a3d';

    pointsRef.current.rotation.y += delta * speed;
    pointsRef.current.rotation.x += delta * speed * 0.28;
    materialRef.current.color.set(color);
    materialRef.current.size = status === 'speaking' ? 0.024 : 0.018;
  });

  return (
    <points
      ref={pointsRef}
      onClick={() => {
        void submitCommand('Brasa, escute meu próximo comando.');
      }}
    >
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial ref={materialRef} color="#ff6a3d" size={0.018} sizeAttenuation depthWrite={false} transparent />
    </points>
  );
}

export function OrbCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.4} />
      <ParticleOrb />
      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.08} luminanceSmoothing={0.2} />
      </EffectComposer>
    </Canvas>
  );
}
