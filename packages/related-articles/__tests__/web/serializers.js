const {
  addSerializers,
  minimalRnw
} = require("@times-components/jest-serializer");

addSerializers(expect, minimalRnw());
