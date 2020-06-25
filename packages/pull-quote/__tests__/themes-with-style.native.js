import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components-native/jest-serializer";
import { iterator } from "@times-components-native/test-utils";
import tests from "./themes-with-style.base";

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

  iterator(tests);
};
