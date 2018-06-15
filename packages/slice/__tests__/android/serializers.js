const {
  addSerializers,
  enzymeDeepSerializer,
  flattenStyle
} = require("@times-components/jest-serializer");

addSerializers(expect, enzymeDeepSerializer, flattenStyle);
