const {
  addSerializers,
  compose,
  enzymeDeepSerializer,
  flattenStyleTransform,
  minimalWebTransform,
  print
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  enzymeDeepSerializer(),
  compose(print, flattenStyleTransform, minimalWebTransform)
);
