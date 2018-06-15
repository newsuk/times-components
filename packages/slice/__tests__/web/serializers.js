const {
  addSerializers,
  enzymeRenderedSerializer,
  rnw
} = require("@times-components/jest-serializer");

addSerializers(expect, enzymeRenderedSerializer(), rnw());
