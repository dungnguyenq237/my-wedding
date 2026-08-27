import { RoundedBox } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { DoubleSide } from "three";
import type { ThreeEvent } from "@react-three/fiber";
import type { Group } from "three";

import type {
  BookStatus,
  TurnDirection,
} from "../hooks/useBookNavigation";
import { BookCover } from "./BookCover";
import { PageStack } from "./PageStack";
import { PageTurnController } from "./PageTurnController";

interface WeddingBookProps {
  status: BookStatus;
  turnDirection: TurnDirection | null;
  reducedMotion: boolean;
  scale: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onOpeningComplete: () => void;
  onTurnComplete: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const WeddingBook = ({
  status,
  turnDirection,
  reducedMotion,
  scale,
  canGoPrevious,
  canGoNext,
  onOpeningComplete,
  onTurnComplete,
  onPrevious,
  onNext,
}: WeddingBookProps) => {
  const bookRef = useRef<Group>(null);
  const frontCoverRef = useRef<Group>(null);
  const [hoveredCorner, setHoveredCorner] = useState<TurnDirection | null>(null);

  useEffect(
    () => () => {
      delete document.body.dataset.pageCorner;
    },
    [],
  );

  const activateCorner = (direction: TurnDirection) => (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    document.body.dataset.pageCorner = "active";
    setHoveredCorner(direction);
  };

  const deactivateCorner = () => {
    delete document.body.dataset.pageCorner;
    setHoveredCorner(null);
  };

  useEffect(() => {
    if (status !== "opening" || !frontCoverRef.current || !bookRef.current) return;

    const timeline = gsap.timeline({ onComplete: onOpeningComplete });
    const duration = reducedMotion ? 0.22 : 2.35;
    timeline
      .to(
        bookRef.current.position,
        { x: 0, y: -0.03, duration: duration * 0.24, ease: "power2.out" },
        0,
      )
      .to(
        frontCoverRef.current.rotation,
        {
          y: -Math.PI * 1.025,
          duration: duration * 0.78,
          ease: reducedMotion ? "none" : "power3.inOut",
        },
        duration * 0.12,
      )
      .to(
        frontCoverRef.current.rotation,
        {
          y: -Math.PI,
          duration: duration * 0.16,
          ease: "sine.out",
        },
        duration * 0.84,
      );

    return () => {
      timeline.kill();
    };
  }, [onOpeningComplete, reducedMotion, status]);

  return (
    <group
      ref={bookRef}
      position={[status === "closed" ? -1.05 : 0, -0.1, 0]}
      rotation={[-0.055, -0.045, -0.018]}
      scale={scale}
    >
      <RoundedBox
        args={[5.98, 4.18, 0.28]}
        radius={0.09}
        smoothness={4}
        position={[3.01, 0, -0.3]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#ad9475" roughness={0.88} />
      </RoundedBox>

      <RoundedBox
        args={[0.34, 4.16, 0.42]}
        radius={0.09}
        smoothness={4}
        position={[0, 0, -0.09]}
        castShadow
      >
        <meshStandardMaterial color="#9b7e5f" roughness={0.82} />
      </RoundedBox>

      <PageStack showLeft={status === "open" || status === "turning"} />

      {status !== "closed" && status !== "opening" && (
        <>
          <mesh position={[-2.91, 0, 0.12]} receiveShadow>
            <planeGeometry args={[5.7, 3.76]} />
            <meshStandardMaterial color="#fbf8f2" roughness={0.95} />
          </mesh>
          <mesh position={[2.91, 0, 0.12]} receiveShadow>
            <planeGeometry args={[5.7, 3.76]} />
            <meshStandardMaterial color="#f8f1e7" roughness={0.95} />
          </mesh>
        </>
      )}

      {status === "turning" && turnDirection !== null && (
        <PageTurnController
          direction={turnDirection}
          reducedMotion={reducedMotion}
          onComplete={onTurnComplete}
        />
      )}

      <BookCover coverRef={frontCoverRef} />

      {status === "open" && canGoPrevious && (
        <mesh
          position={[-5.64, -1.63, hoveredCorner === -1 ? 0.36 : 0.24]}
          rotation={[0, hoveredCorner === -1 ? -0.22 : 0, 0.04]}
          onClick={() => {
            deactivateCorner();
            onPrevious();
          }}
          onPointerEnter={activateCorner(-1)}
          onPointerLeave={deactivateCorner}
        >
          <planeGeometry args={[0.54, 0.54]} />
          <meshStandardMaterial color="#fbf7ef" side={DoubleSide} roughness={0.92} />
        </mesh>
      )}
      {status === "open" && canGoNext && (
        <mesh
          position={[5.64, -1.63, hoveredCorner === 1 ? 0.36 : 0.24]}
          rotation={[0, hoveredCorner === 1 ? 0.22 : 0, -0.04]}
          onClick={() => {
            deactivateCorner();
            onNext();
          }}
          onPointerEnter={activateCorner(1)}
          onPointerLeave={deactivateCorner}
        >
          <planeGeometry args={[0.54, 0.54]} />
          <meshStandardMaterial color="#fbf7ef" side={DoubleSide} roughness={0.92} />
        </mesh>
      )}
    </group>
  );
};
