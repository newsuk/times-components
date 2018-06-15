const {
  addSerializers,
  enzymeDeepSerializer,
  minimalRnw
} = require("@times-components/jest-serializer");

addSerializers(expect, enzymeDeepSerializer, minimalRnw());
