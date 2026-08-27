import { ContactShadows } from "@react-three/drei";

export const Lighting = () => (
  <>
    <ambientLight intensity={1.15} color="#fff7ea" />
    <directionalLight
      position={[4, 6, 7]}
      intensity={3.2}
      color="#ffe6bb"
      castShadow
      shadow-mapSize={[1024, 1024]}
    />
    <pointLight position={[-5, 1, 4]} intensity={18} color="#d5ad72" distance={12} />
    <ContactShadows
      position={[0, -2.35, -0.8]}
      opacity={0.34}
      scale={14}
      blur={2.6}
      far={5}
      resolution={512}
    />
  </>
);

