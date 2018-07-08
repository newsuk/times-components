import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared-std.base";

jest.mock("@times-components/card", () => "Card");
jest.mock("@times-components/link", () => "Link");

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform(
        (value, key) =>
          key === "style" ||
          key.toLowerCase().includes("class") ||
          key === "testID"
      )
    )
  );

  shared(TestRenderer.create);
};
