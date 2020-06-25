import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components-native/jest-serializer";
import shared from "./shared-with-style.base";

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
      flattenStyleTransform
    )
  );

  shared(TestRenderer.create);
};
