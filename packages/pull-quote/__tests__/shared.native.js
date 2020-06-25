import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components-native/jest-serializer";
import shared from "./shared.base";

jest.mock("@times-components-native/link", () => ({
  TextLink: "TextLink"
}));
jest.mock("@times-components-native/icons", () => ({
  IconTwitter: "IconTwitter"
}));

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key === "style")
    )
  );

  shared(TestRenderer.create);
};
