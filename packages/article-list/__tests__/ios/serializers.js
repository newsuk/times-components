const {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(print, flattenStyleTransform, minimalNativeTransform)
);
