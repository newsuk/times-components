export const decodeEntities = (str: string) =>
  str
    .replace(/&#(\d+);/g, (__: string, d: number) => String.fromCharCode(d))
    .replace(/\s+/g, ' ');
