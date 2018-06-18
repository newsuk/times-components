const {
  addSerializers,
  enzymeRenderedSerializer,
  minimalRnw
} = require("@times-components/jest-serializer");

addSerializers(expect, enzymeRenderedSerializer(), minimalRnw());
