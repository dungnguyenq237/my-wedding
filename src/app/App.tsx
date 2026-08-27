import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { WeddingContent } from "../components/wedding/WeddingContent";
import { AudioButton } from "../components/ui/AudioButton";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { PageNavigation } from "../components/ui/PageNavigation";
import { SceneErrorBoundary } from "../components/ui/SceneErrorBoundary";
import { WebGLFallback } from "../components/ui/WebGLFallback";
import { coupleInitials, weddingConfig } from "../config/wedding";
import { useBookNavigation } from "../hooks/useBookNavigation";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useResponsiveBook } from "../hooks/useResponsiveBook";
import { LocalStorageRSVPRepository } from "../repositories/rsvp";
import { supportsWebGL } from "../utils/webgl";

const WeddingScene = lazy(() =>
  import("../three/WeddingScene").then(({ WeddingScene: Scene }) => ({
    default: Scene,
  })),
);

export const App = () => {
  const [ready, setReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const webGLAvailable = useMemo(supportsWebGL, []);
  const reducedMotion = useReducedMotion();
  const profile = useResponsiveBook();
  const navigation = useBookNavigation();
  const { nextPage, previousPage } = navigation;
  const repository = useMemo(() => new LocalStorageRSVPRepository(), []);
  const touchStartX = useRef<number | null>(null);
  const handleSceneFailure = useCallback(() => setSceneFailed(true), []);

  useEffect(() => {
    document.title = `${weddingConfig.couple.bride.name} & ${weddingConfig.couple.groom.name} · ${weddingConfig.displayDate}`;
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), reducedMotion ? 120 : 700);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      if (event.key === "ArrowRight") nextPage();
      if (event.key === "ArrowLeft") previousPage();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextPage, previousPage]);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 52) return;
    if (distance < 0) navigation.nextPage();
    else navigation.previousPage();
  };

  if (!ready) return <LoadingScreen />;
  if (!webGLAvailable || sceneFailed) {
    return <WebGLFallback repository={repository} />;
  }

  const bookIsOpen = navigation.status === "open" || navigation.status === "turning";

  return (
    <main
      className="wedding-experience"
      data-status={navigation.status}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="ambient-glow" aria-hidden="true" />
      <SceneErrorBoundary onError={handleSceneFailure}>
        <Suspense fallback={<div className="scene scene-loading" aria-hidden="true" />}>
          <WeddingScene
            status={navigation.status}
            turnDirection={navigation.turnDirection}
            reducedMotion={reducedMotion}
            profile={profile}
            canGoPrevious={navigation.canGoPrevious}
            canGoNext={navigation.canGoNext}
            onOpeningComplete={navigation.completeOpening}
            onTurnComplete={navigation.completeTurn}
            onPrevious={navigation.previousPage}
            onNext={navigation.nextPage}
            onContextLost={handleSceneFailure}
          />
        </Suspense>
      </SceneErrorBoundary>

      <header className="experience-header">
        <div
          className="monogram"
          aria-label={`${weddingConfig.couple.bride.name} and ${weddingConfig.couple.groom.name}`}
        >
          {coupleInitials.split(" & ")[0]} <span>&amp;</span>{" "}
          {coupleInitials.split(" & ")[1]}
        </div>
        <AudioButton />
      </header>

      {navigation.status === "closed" && (
        <section className="intro-panel">
          <p>YOU ARE CORDIALLY INVITED</p>
          <h1>
            {weddingConfig.couple.bride.name.split(" ")[0]} <span>&amp;</span>{" "}
            {weddingConfig.couple.groom.name.split(" ")[0]}
          </h1>
          <button type="button" onClick={navigation.openBook}>
            Open Our Story <span aria-hidden="true">→</span>
          </button>
        </section>
      )}

      {navigation.status === "opening" && (
        <p className="opening-status" role="status">
          Opening our story…
        </p>
      )}

      {bookIsOpen && (
        <>
          <WeddingContent
            currentPage={navigation.currentPage}
            status={navigation.status}
            repository={repository}
          />
          <PageNavigation
            pageIndex={navigation.pageIndex}
            currentLabel={navigation.currentLabel}
            canGoPrevious={navigation.canGoPrevious}
            canGoNext={navigation.canGoNext}
            isTurning={navigation.status === "turning"}
            onPrevious={navigation.previousPage}
            onNext={navigation.nextPage}
          />
        </>
      )}
    </main>
  );
};
