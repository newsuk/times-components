const { AppRegistry } = require("react-native-web");
const { addSerializers, rnw } = require("@times-components-native/jest-serializer");

addSerializers(expect, rnw(AppRegistry));
