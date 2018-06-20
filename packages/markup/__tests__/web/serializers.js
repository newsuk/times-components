const {
  addSerializers,
  compose,
  flattenStyleTransform,
  rnwTransform,
  stylePrinter
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  compose(stylePrinter, flattenStyleTransform, rnwTransform())
);
