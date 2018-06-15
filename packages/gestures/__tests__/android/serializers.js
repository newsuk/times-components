const {
  addSerializers,
  enzymeRenderedSerializer
} = require("@times-components/jest-serializer");

addSerializers(expect, enzymeRenderedSerializer());
