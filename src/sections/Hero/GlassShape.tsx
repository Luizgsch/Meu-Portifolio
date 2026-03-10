import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

export const GlassShape = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Rotação sutil para capturar as luzes de diferentes ângulos
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.rotation.y = time * 0.2;

      const scale = 1.6 + Math.sin(time * 0.4) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <Octahedron args={[1, 3]} ref={meshRef}>
        <MeshTransmissionMaterial
          /* Configurações para efeito de vidro High-Fidelity */
          backside
          backsideThickness={1}
          samples={16}
          thickness={2}
          chromaticAberration={0.08}
          anisotropy={0.5}
          distortion={0.4}
          distortionScale={0.5}
          temporalDistortion={0.2}
          ior={1.4}
          color="#ffffff"
          transmission={1}
          roughness={0.02} /* Quase zero para reflexos nítidos */
          metalness={0.1}
          clearcoat={1}
          envMapIntensity={1.5} /* Aumenta o brilho do mapa de ambiente */
        />
      </Octahedron>
    </Float>
  );
};

