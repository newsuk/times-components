const {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  compose(print, flattenStyleTransform, minimalNativeTransform)
);
