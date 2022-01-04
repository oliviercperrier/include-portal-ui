export const isBoolTrue = (value: any) =>
  ["true", "True", "TRUE", true, "1", 1].includes(value);

export const isBoolFalse = (value: any) =>
  ["false", "False", "FALSE", false, "0", 1].includes(value);
