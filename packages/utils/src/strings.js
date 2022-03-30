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

export const stripTags = (str, replacement) =>
  str.replace(/(<([^>]+)>)/gi, replacement);

export const checkStylesForUnits = styles => {
  const newStyles = styles;

  Object.keys(newStyles).forEach(key => {
    if (key === "lineHeight") {
      const value = newStyles[key];
      if (typeof value === "number") {
        newStyles[key] = `${value}px`;
      }
    }
  });

  // TODO: ADAM: this is only looking in a flat structure, maybe we should look for nested values in future
  return newStyles;
};
