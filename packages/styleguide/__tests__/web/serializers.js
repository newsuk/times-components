const {
  addSerializers,
  compose,
  minimalWebTransform,
  print
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  compose(
    print,
    minimalWebTransform
  )
);

// eslint-disable-next-line global-require
require("jest-styled-components");
