import { AppRegistry } from "react-native-web";
import { addSerializers, minimalRnw } from "@times-components/jest-serializer";
import shared from "../shared";

addSerializers(expect, minimalRnw(AppRegistry));

shared();
