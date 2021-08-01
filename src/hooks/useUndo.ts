import { useCallback, useReducer } from "react";

enum ACTION_TYPES {
  UNDO,
  REDO,
  SET,
  RESET,
}

interface IState<T> {
  past: T[];
  present: T;
  future: T[];
}

interface IAction<T> {
  type: ACTION_TYPES;
  payload?: T;
}

const undoReducer = <T>(state: IState<T>, action: IAction<T>) => {
  const { past, present, future } = state;
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.REDO: {
      if (past.length <= 0) return state;
      return {
        ...state,
        past: [...past, present],
        present: future[0],
        future: future.slice(1),
      };
    }

    case ACTION_TYPES.UNDO: {
      if (future.length <= 0) return state;
      return {
        ...state,
        future: [present, ...future],
        present: past[past.length - 1],
        past: past.slice(0, past.length - 1),
      };
    }

    case ACTION_TYPES.SET: {
      if (payload === present) return state;
      return {
        past: [...past, present],
        present: payload,
        future: [],
      };
    }

    case ACTION_TYPES.RESET: {
      return {
        past: [],
        present: payload,
        future: [],
      };
    }

    default: {
      return state;
    }
  }
};

const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as IState<T>);

  const undo = useCallback(
    () =>
      dispatch({
        type: ACTION_TYPES.UNDO,
      }),
    [],
  );

  const redo = useCallback(
    () =>
      dispatch({
        type: ACTION_TYPES.REDO,
      }),
    [],
  );

  const set = useCallback(
    (newPresent: T) =>
      dispatch({
        type: ACTION_TYPES.SET,
        payload: newPresent,
      }),
    [],
  );

  const reset = useCallback(
    (newPresent: T) =>
      dispatch({
        type: ACTION_TYPES.RESET,
        payload: newPresent,
      }),
    [],
  );

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  return [state, { set, reset, canUndo, undo, canRedo, redo }];
};

export default useUndo;
