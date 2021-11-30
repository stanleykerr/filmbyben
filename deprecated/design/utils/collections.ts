export const isCSSNumberValue = (value?: string | number) =>
  value !== undefined && !Number.isNaN(+value);
