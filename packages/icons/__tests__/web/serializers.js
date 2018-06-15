const {
  addSerializers,
  minimalWeb
} = require("@times-components/jest-serializer");

addSerializers(expect, minimalWeb);
