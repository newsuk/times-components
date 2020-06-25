import {
  addSerializers,
  minimalNative
} from "@times-components-native/jest-serializer";
import shared from "../shared";

addSerializers(expect, minimalNative);

shared();
