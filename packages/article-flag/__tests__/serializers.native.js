const {
  addSerializers,
  enzymeRenderedSerializer,
  minimalNative
} = require("@times-components/jest-serializer");

addSerializers(expect, enzymeRenderedSerializer(), minimalNative);
