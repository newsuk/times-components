const {
  addSerializers,
  compose,
  enzymeDeepSerializer,
  flattenStyleTransform,
  minimalWebTransform,
  rnwTransform,
  rnwPrinter
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  enzymeDeepSerializer,
  compose(
    rnwPrinter,
    flattenStyleTransform,
    minimalWebTransform,
    rnwTransform()
  )
);
