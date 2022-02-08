export const truncateString = (text: string, maxLength: number) =>
  `${text.substring(0, maxLength)}${text.length > maxLength ? "..." : ""}`;
