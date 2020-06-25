const {
  addSerializers,
  flattenStyle
} = require("@times-components-native/jest-serializer");

addSerializers(expect, flattenStyle);
