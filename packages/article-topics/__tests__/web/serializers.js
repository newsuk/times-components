const {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  flattenStyleTransform,
  minimalWebTransform,
  print
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(print, flattenStyleTransform, minimalWebTransform)
);
