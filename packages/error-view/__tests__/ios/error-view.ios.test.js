import {
  addSerializers,
  minimalNative
} from "@times-components/jest-serializer";
import shared from "../shared";

addSerializers(expect, minimalNative);

shared();
