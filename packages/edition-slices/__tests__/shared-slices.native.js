import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared-slices.base";

jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/gradient", () => "Gradient");

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform(
        (value, key) => key === "style" || key.includes("Class")
      )
    )
  );

  shared();
};
