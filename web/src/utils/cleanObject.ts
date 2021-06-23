export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
	const result = { ...object };
	Object.keys(object).forEach(key => {
		// @ts-ignore
		const value = object[key];
		// @ts-ignore
		if (!isFalsy(value)) delete result[key];
	});
};
