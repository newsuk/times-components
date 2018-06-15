const {
  addSerializers,
  enzymeDeepSerializer,
  rnw
} = require("@times-components/jest-serializer");

addSerializers(enzymeDeepSerializer, rnw());
