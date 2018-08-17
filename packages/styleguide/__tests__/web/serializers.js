const { AppRegistry } = require("react-native-web");
const {
  addSerializers,
  compose,
  minimalWebTransform,
  print,
  rnwTransform
} = require("@times-components/jest-serializer");

addSerializers(
  expect,
  compose(print, minimalWebTransform, rnwTransform(AppRegistry))
);

// eslint-disable-next-line global-require
require("jest-styled-components");
