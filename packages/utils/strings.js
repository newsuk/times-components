/* eslint-disable import/prefer-default-export */

export const ratioTextToFloat = s => {
  if (!s || !s.length) {
    return 1;
  }

  const [w, h] = s.split(":");
  const ratio = parseFloat(w) / parseFloat(h);

  return !Number.isNaN(ratio) ? ratio : 1;
};
