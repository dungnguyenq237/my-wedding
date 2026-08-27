import { useCallback, useMemo, useReducer } from "react";

import { weddingConfig } from "../config/wedding";

export type BookStatus = "closed" | "opening" | "open" | "turning";
export type TurnDirection = -1 | 1;

export interface BookNavigationState {
  status: BookStatus;
  pageIndex: number;
  turnDirection: TurnDirection | null;
}

export type BookNavigationAction =
  | { type: "OPEN" }
  | { type: "OPEN_COMPLETE" }
  | { type: "TURN"; direction: TurnDirection }
  | { type: "TURN_COMPLETE" };

export const initialBookState: BookNavigationState = {
  status: "closed",
  pageIndex: 0,
  turnDirection: null,
};

const lastPageIndex = weddingConfig.pages.length - 1;

export const bookReducer = (
  state: BookNavigationState,
  action: BookNavigationAction,
): BookNavigationState => {
  switch (action.type) {
    case "OPEN":
      return state.status === "closed" ? { ...state, status: "opening" } : state;
    case "OPEN_COMPLETE":
      return state.status === "opening" ? { ...state, status: "open" } : state;
    case "TURN": {
      if (state.status !== "open") return state;
      const nextIndex = state.pageIndex + action.direction;
      if (nextIndex < 0 || nextIndex > lastPageIndex) return state;
      return {
        ...state,
        status: "turning",
        turnDirection: action.direction,
      };
    }
    case "TURN_COMPLETE":
      if (state.status !== "turning" || state.turnDirection === null) return state;
      return {
        status: "open",
        pageIndex: state.pageIndex + state.turnDirection,
        turnDirection: null,
      };
  }
};

export const useBookNavigation = () => {
  const [state, dispatch] = useReducer(bookReducer, initialBookState);
  const openBook = useCallback(() => dispatch({ type: "OPEN" }), []);
  const completeOpening = useCallback(
    () => dispatch({ type: "OPEN_COMPLETE" }),
    [],
  );
  const nextPage = useCallback(
    () => dispatch({ type: "TURN", direction: 1 }),
    [],
  );
  const previousPage = useCallback(
    () => dispatch({ type: "TURN", direction: -1 }),
    [],
  );
  const completeTurn = useCallback(
    () => dispatch({ type: "TURN_COMPLETE" }),
    [],
  );

  return useMemo(
    () => ({
      ...state,
      currentPage: weddingConfig.pages[state.pageIndex].id,
      currentLabel: weddingConfig.pages[state.pageIndex].label,
      canGoPrevious: state.status === "open" && state.pageIndex > 0,
      canGoNext: state.status === "open" && state.pageIndex < lastPageIndex,
      openBook,
      completeOpening,
      nextPage,
      previousPage,
      completeTurn,
    }),
    [
      completeOpening,
      completeTurn,
      nextPage,
      openBook,
      previousPage,
      state,
    ],
  );
};
