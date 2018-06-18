const {
  addSerializers,
  compose,
  flattenStyleTransform,
  rnwTransform,
  rnwPrinter
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  compose(rnwPrinter, flattenStyleTransform, rnwTransform())
);
