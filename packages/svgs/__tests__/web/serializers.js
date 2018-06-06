const {
  compose,
  flattenStyleTransform,
  minimalWebTransform,
  print
} = require("@times-components/jest-serializer");

expect.addSnapshotSerializer(
  compose(print, flattenStyleTransform, minimalWebTransform)
);
