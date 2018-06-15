const {
  addSerializers,
  minimalNative
} = require("@times-components/jest-serializer");

addSerializers(expect, minimalNative);
