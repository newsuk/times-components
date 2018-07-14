const {
  addSerializers,
  compose,
  minimalWebTransform,
  print,
  rnwTransform
} = require("@times-components/jest-serializer");

addSerializers(expect, compose(print, minimalWebTransform, rnwTransform()));

// eslint-disable-next-line global-require
require("jest-styled-components");
