import { AppRegistry } from "react-native-web";
import { addSerializers, minimalRnw } from "@times-components-native/jest-serializer";
import shared from "../shared";

addSerializers(expect, minimalRnw(AppRegistry));

shared();
