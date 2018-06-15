const {
  addSerializers,
  enzymeDeepSerializer
} = require("@times-components/jest-serializer");

addSerializers(expect, enzymeDeepSerializer());
