const {
  addSerializers,
  compose,
  minimalWebTransform,
  rnwTransform,
  rnwPrinter
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  compose(rnwPrinter, minimalWebTransform, rnwTransform())
);
