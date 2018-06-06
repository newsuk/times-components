const {
  compose,
  flattenStyleTransform,
  minimalWebTransform,
  rnwTransform,
  rnwPrinter
} = require("@times-components/jest-serializer");

expect.addSnapshotSerializer(
  compose(
    rnwPrinter,
    flattenStyleTransform,
    minimalWebTransform,
    rnwTransform()
  )
);
