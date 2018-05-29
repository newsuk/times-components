/* eslint-disable import/prefer-default-export */

// apply transformations to add uppercase and letter spacing.
// letterSpacing CSS prop does not work on android:
// https://github.com/facebook/react-native/pull/13199
// when we upgrade to react-native 0.55 this can be replaced
export const androidLetterSpacing = title =>
  title
    .toUpperCase()
    .split("")
    .join("\u200A");

export const capitalise = title => title.replace(/\b\w/g, l => l.toUpperCase());

export const ratioTextToFloat = s => {
  if (!s || !s.length) {
    return 1;
  }

  const [w, h] = s.split(":");
  const ratio = parseFloat(w) / parseFloat(h);

  return !Number.isNaN(ratio) ? ratio : 1;
};
