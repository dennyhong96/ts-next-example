import { useState } from "react";

const useArray = <T>(initialItems: T[]) => {
	const [items, setItems] = useState(initialItems);

	const clear = (): void => {
		setItems([]);
	};

	const removeIndex = (index: number): void => {
		setItems([...items].splice(index, 1));
	};

	const add = (newItem: T): void => {
		setItems([...items, newItem]);
	};

	return {
		value: items,
		setValue: setItems,
		clear,
		removeIndex,
		add,
	};
};

export default useArray;
