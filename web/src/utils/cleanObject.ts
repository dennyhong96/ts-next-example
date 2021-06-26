export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// TODO: type
export const cleanObject = (object: Record<string, unknown>) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (!isFalsy(value)) delete result[key];
  });
};
