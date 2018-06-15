const {
  addSerializers,
  enzymeDeepSerializer,
  rnw
} = require("@times-components/jest-serializer");

addSerializers(expect, enzymeDeepSerializer(), rnw());
