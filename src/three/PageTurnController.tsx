import gsap from "gsap";
import { useEffect, useRef } from "react";

import type { TurnDirection } from "../hooks/useBookNavigation";
import { BookPage } from "./BookPage";

interface PageTurnControllerProps {
  direction: TurnDirection;
  reducedMotion: boolean;
  onComplete: () => void;
}

export const PageTurnController = ({
  direction,
  reducedMotion,
  onComplete,
}: PageTurnControllerProps) => {
  const progress = useRef(0);

  useEffect(() => {
    progress.current = 0;
    const tween = gsap.to(progress, {
      current: 1,
      duration: reducedMotion ? 0.18 : 0.95,
      ease: reducedMotion ? "none" : "power2.inOut",
      onComplete,
    });
    return () => {
      tween.kill();
    };
  }, [direction, onComplete, reducedMotion]);

  return <BookPage direction={direction} progress={progress} />;
};
