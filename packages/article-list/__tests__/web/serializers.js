const {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  minimalWebTransform,
  rnwTransform,
  rnwPrinter
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  enzymeTreeSerializer(),
  compose(
    rnwPrinter,
    flattenStyleTransform,
    minimalWebTransform,
    rnwTransform()
  )
);
