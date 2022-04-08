export const isBoolTrue = (value: number | boolean | string | undefined | null) =>
  !!value || 'true' === value?.toString().toLowerCase();

export const isBoolFalse = (value: number | boolean | string | undefined | null) =>
  !value || 'false' === value?.toString().toLowerCase();
