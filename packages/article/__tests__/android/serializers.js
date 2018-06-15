const {
  addSerializers,
  compose,
  enzymeDeepSerializer,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  enzymeDeepSerializer,
  compose(print, flattenStyleTransform, minimalNativeTransform)
);
