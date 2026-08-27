import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface SceneErrorBoundaryProps {
  children: ReactNode;
  onError: (error: Error, info: ErrorInfo) => void;
}

interface SceneErrorBoundaryState {
  failed: boolean;
}

export class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError(error, info);
  }

  render(): ReactNode {
    return this.state.failed ? null : this.props.children;
  }
}

