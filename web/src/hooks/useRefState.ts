import { useEffect, useState, useRef } from "react";

const useRefState = <D>(initialState: D) => {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(initialState);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return {
    state,
    stateRef,
    setState,
  };
};

export default useRefState;
