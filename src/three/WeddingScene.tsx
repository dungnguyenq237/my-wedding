import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import type {
  BookStatus,
  TurnDirection,
} from "../hooks/useBookNavigation";
import type { ResponsiveBookProfile } from "../hooks/useResponsiveBook";
import { CameraRig } from "./CameraRig";
import { DustParticles } from "./DustParticles";
import { Lighting } from "./Lighting";
import { WeddingBook } from "./WeddingBook";

interface WeddingSceneProps {
  status: BookStatus;
  turnDirection: TurnDirection | null;
  reducedMotion: boolean;
  profile: ResponsiveBookProfile;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onOpeningComplete: () => void;
  onTurnComplete: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onContextLost: () => void;
}

export const WeddingScene = ({
  status,
  turnDirection,
  reducedMotion,
  profile,
  canGoPrevious,
  canGoNext,
  onOpeningComplete,
  onTurnComplete,
  onPrevious,
  onNext,
  onContextLost,
}: WeddingSceneProps) => (
  <div className="scene" aria-hidden="true">
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [...profile.cameraPosition], fov: 38, near: 0.1, far: 60 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          "webglcontextlost",
          (event) => {
            event.preventDefault();
            onContextLost();
          },
          { once: true },
        );
      }}
    >
      <Suspense fallback={null}>
        <CameraRig
          status={status}
          isMobile={profile.isMobile}
          reducedMotion={reducedMotion}
        />
        <Lighting />
        <DustParticles disabled={reducedMotion} />
        <WeddingBook
          status={status}
          turnDirection={turnDirection}
          reducedMotion={reducedMotion}
          scale={profile.scale}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          onOpeningComplete={onOpeningComplete}
          onTurnComplete={onTurnComplete}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </Suspense>
    </Canvas>
  </div>
);
