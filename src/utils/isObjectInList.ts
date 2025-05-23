export const isObjectInList = <T>(obj: T, list: T[]) => {
  return list.some((item) => JSON.stringify(item) === JSON.stringify(obj));
};
