import { useEffect, useState } from "react";

const useDebounce = <V>(value: V, delay?: number): V => {
  const [debouncedValue, setDebouncedvalue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedvalue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
