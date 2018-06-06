const {
  compose,
  flattenStyleTransform,
  rnwTransform,
  rnwPrinter
} = require("@times-components/jest-serializer");

expect.addSnapshotSerializer(
  compose(rnwPrinter, flattenStyleTransform, rnwTransform())
);
