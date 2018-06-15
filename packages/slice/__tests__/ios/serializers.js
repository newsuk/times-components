const {
  addSerializers,
  enzymeRenderedSerializer,
  flattenStyle
} = require("@times-components/jest-serializer");

addSerializers(expect, enzymeRenderedSerializer(), flattenStyle);
