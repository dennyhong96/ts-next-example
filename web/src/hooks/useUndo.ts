import { useCallback, useState } from "react";

const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const { past, present, future } = state;
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;
    setState((prev) => ({
      future: [prev.present, ...prev.future],
      present: prev.past[prev.past.length - 1],
      past: prev.past.slice(0, prev.past.length - 1),
    }));
  }, [canUndo]);

  const redo = useCallback(() => {
    if (!canRedo) return;
    setState((prev) => ({
      past: [...prev.past, prev.present],
      present: prev.future[0],
      future: prev.future.slice(1),
    }));
  }, [canRedo]);

  const set = useCallback((newPresent: T) => {
    setState((prev) => {
      if (newPresent === prev.present) return prev;
      return {
        past: [...prev.past, prev.present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      future: [],
    });
  }, []);

  return [
    { past, present, future },
    { set, reset, canUndo, undo, canRedo, redo },
  ];
};

export default useUndo;
