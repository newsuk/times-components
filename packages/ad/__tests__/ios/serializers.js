const {
  addSerializers,
  compose,
  minimalWebTransform,
  minimaliseTransform,
  print
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  compose(
    print,
    minimalWebTransform,
    minimaliseTransform((value, key) => key === "style")
  )
);
