const {
  compose,
  minimalWebTransform,
  rnwTransform,
  rnwPrinter
} = require("@times-components/jest-serializer");

expect.addSnapshotSerializer(
  compose(rnwPrinter, minimalWebTransform, rnwTransform())
);
