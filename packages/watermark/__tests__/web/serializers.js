const {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalWebTransform,
  print
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  compose(print, flattenStyleTransform, minimalWebTransform)
);
