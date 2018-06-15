const {
  addSerializers,
  compose,
  enzymeShallowSerializer,
  flattenStyleTransform,
  minimalWebTransform,
  rnwTransform,
  rnwPrinter
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  enzymeShallowSerializer(),
  compose(
    rnwPrinter,
    flattenStyleTransform,
    minimalWebTransform,
    rnwTransform()
  )
);
