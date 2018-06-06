const {
  compose,
  minimalNativeTransform,
  flattenStyleTransform,
  print
} = require("@times-components/jest-serializer");
const { createSerializer } = require("enzyme-to-json");

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
expect.addSnapshotSerializer(
  compose(print, minimalNativeTransform, flattenStyleTransform)
);
