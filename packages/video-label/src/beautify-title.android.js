// apply transformations to add uppercase and letter spacing.
// letterSpacing CSS prop does not work on android:
// https://github.com/facebook/react-native/pull/13199

export default title =>
  title
    .toUpperCase()
    .split("")
    .join("\u200A");
