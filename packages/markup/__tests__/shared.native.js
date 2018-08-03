import {
  addSerializers,
  minimalNative
} from "@times-components/jest-serializer";
import TestRenderer from "react-test-renderer";
import shared from "./shared.base";

export default () => {
  addSerializers(expect, minimalNative);

  shared(TestRenderer.create);
};
