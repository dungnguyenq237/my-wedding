import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute } from "three";
import type { Points } from "three";

interface DustParticlesProps {
  disabled: boolean;
}

export const DustParticles = ({ disabled }: DustParticlesProps) => {
  const pointsRef = useRef<Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(90 * 3);
    for (let index = 0; index < 90; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 15;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    const bufferGeometry = new BufferGeometry();
    bufferGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return bufferGeometry;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current || disabled) return;
    pointsRef.current.rotation.z += delta * 0.008;
    pointsRef.current.rotation.y += delta * 0.004;
  });

  if (disabled) return null;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#d6b77e"
        size={0.018}
        transparent
        opacity={0.48}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
};
