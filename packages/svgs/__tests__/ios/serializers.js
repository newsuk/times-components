const {
  addSerializers,
  flattenStyle
} = require("@times-components/jest-serializer");

addSerializers(expect, flattenStyle);
