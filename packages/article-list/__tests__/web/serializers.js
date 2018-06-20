const {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  enzymeTreeSerializer(),
  compose(
    stylePrinter,
    flattenStyleTransform,
    minimalWebTransform,
    rnwTransform()
  )
);
