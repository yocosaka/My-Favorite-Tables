export const transformLowerCaseAndUnderscore = (str: string): string => {
  return str.toLowerCase().replaceAll(' ', '_');
};

export const transformToCamelCase = (str: string): string => {
  return str
    .split(' ')
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join('');
};
