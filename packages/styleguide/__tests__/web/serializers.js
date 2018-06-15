const { addSerializers, rnw } = require("@times-components/jest-serializer");

addSerializers(expect, rnw());
