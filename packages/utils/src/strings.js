export const capitalise = title =>
  title.charAt(0).toUpperCase() + title.slice(1);

export const ratioTextToFloat = s => {
  if (!s || !s.length) {
    return 1;
  }

  const [w, h] = s.split(":");
  const ratio = parseFloat(w) / parseFloat(h);

  return !Number.isNaN(ratio) ? ratio : 1;
};
