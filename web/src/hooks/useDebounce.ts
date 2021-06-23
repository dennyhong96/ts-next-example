import { useEffect, useState } from "react";

const useDebounce = (value: unknown, delay?: number) => {
	const [debouncedValue, setDebouncedvalue] = useState(value);

	useEffect(() => {
		const timeoutId = setTimeout(() => setDebouncedvalue(value), delay);
		return () => clearTimeout(timeoutId);
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;
