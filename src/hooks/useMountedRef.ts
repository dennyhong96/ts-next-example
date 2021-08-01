import { useEffect, useRef } from "react";

// Assert if component is unmounted, prevent memory leak
const useMountedRef = () => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  });

  return isMountedRef;
};

export default useMountedRef;
