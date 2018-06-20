const {
  addSerializers,
  compose,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  compose(stylePrinter, minimalWebTransform, rnwTransform())
);
