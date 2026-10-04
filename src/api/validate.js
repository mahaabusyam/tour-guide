export const expectArray = (data, source) => {
  if (!Array.isArray(data)) throw new Error(`${source} is missing or invalid`);
  return data;
};

export const expectObject = (data, source, keys = []) => {
  const valid =
    data !== null &&
    typeof data === 'object' &&
    !Array.isArray(data) &&
    keys.every((key) => key in data);

  if (!valid) throw new Error(`${source} is missing or invalid`);
  return data;
};