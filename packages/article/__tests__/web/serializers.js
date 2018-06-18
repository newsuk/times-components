const {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  flattenStyleTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    stylePrinter,
    flattenStyleTransform,
    minimalWebTransform,
    rnwTransform()
  )
);
