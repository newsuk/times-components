import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  justChildren,
  minimalNativeTransform,
  print,
  replaceTransform
} from "@times-components/jest-serializer";
import shared from "./shared-with-style.base";

jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/gradient", () => "Gradient");

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimalNativeTransform,
      replaceTransform({
        ForwardRef: justChildren
      })
    )
  );

  shared(TestRenderer.create);
};
