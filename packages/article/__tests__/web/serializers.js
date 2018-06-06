const {
  compose,
  flattenStyleTransform,
  minimalWebTransform,
  rnwTransform,
  rnwPrinter
} = require("@times-components/jest-serializer");
const { createSerializer } = require("enzyme-to-json");

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
expect.addSnapshotSerializer(
  compose(
    rnwPrinter,
    flattenStyleTransform,
    minimalWebTransform,
    rnwTransform()
  )
);
