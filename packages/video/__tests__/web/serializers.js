const {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  compose(
    stylePrinter,
    flattenStyleTransform,
    minimalWebTransform,
    rnwTransform()
  )
);
