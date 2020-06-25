const {
  addSerializers,
  minimalNative
} = require("@times-components-native/jest-serializer");

addSerializers(expect, minimalNative);
