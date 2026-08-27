import { Html, RoundedBox } from "@react-three/drei";
import type { RefObject } from "react";
import type { Group } from "three";

import { weddingConfig } from "../config/wedding";

interface BookCoverProps {
  coverRef: RefObject<Group | null>;
}

export const BookCover = ({ coverRef }: BookCoverProps) => (
  <group ref={coverRef} position={[-0.02, 0, 0.19]}>
    <RoundedBox
      args={[5.98, 4.18, 0.28]}
      radius={0.09}
      smoothness={4}
      position={[3.01, 0, 0]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color="#cbb292"
        roughness={0.86}
        metalness={0.03}
      />
    </RoundedBox>
    <mesh position={[3.01, 0, 0.151]}>
      <planeGeometry args={[5.5, 3.72]} />
      <meshStandardMaterial color="#d7c5ab" roughness={0.92} />
    </mesh>
    <Html
      transform
      center
      distanceFactor={7.6}
      position={[3.01, 0, 0.18]}
      style={{ pointerEvents: "none" }}
    >
      <div className="cover-foil" aria-hidden="true">
        <span>THE WEDDING OF</span>
        <strong>
          {weddingConfig.couple.bride.name.split(" ")[0]}
          <i>&amp;</i>
          {weddingConfig.couple.groom.name.split(" ")[0]}
        </strong>
        <span>{weddingConfig.displayDate}</span>
      </div>
    </Html>
  </group>
);

