import { weddingConfig } from "../../config/wedding";

interface PageNavigationProps {
  pageIndex: number;
  currentLabel: string;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isTurning: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const PageNavigation = ({
  pageIndex,
  currentLabel,
  canGoPrevious,
  canGoNext,
  isTurning,
  onPrevious,
  onNext,
}: PageNavigationProps) => (
  <nav className="page-navigation" aria-label="Wedding book pages">
    <button
      type="button"
      onClick={onPrevious}
      disabled={!canGoPrevious || isTurning}
      aria-label="Previous page"
    >
      <span aria-hidden="true">←</span>
    </button>
    <div className="page-progress">
      <span aria-live="polite">{currentLabel}</span>
      <div aria-hidden="true">
        {weddingConfig.pages.map((page, index) => (
          <i key={page.id} data-active={index === pageIndex} />
        ))}
      </div>
    </div>
    <button
      type="button"
      onClick={onNext}
      disabled={!canGoNext || isTurning}
      aria-label="Next page"
    >
      <span aria-hidden="true">→</span>
    </button>
  </nav>
);

