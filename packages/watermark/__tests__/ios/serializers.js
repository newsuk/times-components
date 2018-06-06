const {
  compose,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} = require("@times-components/jest-serializer");

expect.addSnapshotSerializer(
  compose(print, flattenStyleTransform, minimalNativeTransform)
);
