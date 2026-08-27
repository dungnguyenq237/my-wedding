import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  DoubleSide,
  PlaneGeometry,
} from "three";
import type { BufferAttribute, Group, Mesh } from "three";

import type { TurnDirection } from "../hooks/useBookNavigation";

const pageWidth = 5.72;
const pageHeight = 3.78;

interface BookPageProps {
  direction: TurnDirection;
  progress: { current: number };
}

export const BookPage = ({ direction, progress }: BookPageProps) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const geometry = useMemo(() => {
    const pageGeometry = new PlaneGeometry(pageWidth, pageHeight, 28, 2);
    pageGeometry.translate((pageWidth / 2) * direction, 0, 0);
    return pageGeometry;
  }, [direction]);
  const basePositions = useMemo(
    () => Float32Array.from(geometry.getAttribute("position").array),
    [geometry],
  );

  useFrame(() => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    if (!group || !mesh) return;

    const turn = progress.current;
    group.rotation.y = direction === 1 ? -Math.PI * turn : Math.PI * turn;

    const positions = mesh.geometry.getAttribute("position") as BufferAttribute;
    for (let index = 0; index < positions.count; index += 1) {
      const baseX = basePositions[index * 3];
      const normalizedX = Math.min(1, Math.abs(baseX) / pageWidth);
      const curl = Math.sin(Math.PI * normalizedX);
      const lift = Math.sin(Math.PI * turn) * curl * 0.64;
      const edgeCurl = Math.sin(Math.PI * turn) * normalizedX * 0.13;
      positions.setZ(index, lift + edgeCurl);
    }
    positions.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
  });

  return (
    <group ref={groupRef} position={[0, 0, 0.18]}>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#fbf7ef"
          roughness={0.91}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
};
