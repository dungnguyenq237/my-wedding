import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { Vector3 } from "three";

import type { BookStatus } from "../hooks/useBookNavigation";

interface CameraRigProps {
  status: BookStatus;
  isMobile: boolean;
  reducedMotion: boolean;
}

export const CameraRig = ({ status, isMobile, reducedMotion }: CameraRigProps) => {
  const targetPosition = useMemo(() => new Vector3(), []);
  const lookAtTarget = useMemo(() => new Vector3(), []);

  useFrame(({ camera, pointer }, delta) => {
    const open = status === "open" || status === "turning";
    const parallax = reducedMotion ? 0 : 1;
    targetPosition.set(
      (open ? 0 : 1.15) + pointer.x * 0.12 * parallax,
      (open ? 0.08 : 0.35) + pointer.y * 0.08 * parallax,
      isMobile ? (open ? 12.4 : 10.8) : open ? 9.35 : 8.5,
    );
    const smoothing = 1 - Math.exp(-delta * (reducedMotion ? 14 : 3.2));
    camera.position.lerp(targetPosition, smoothing);
    lookAtTarget.set(open ? 0 : 1.1, 0, 0);
    camera.lookAt(lookAtTarget);
  });

  return null;
};

