/* eslint-disable global-require */
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  print,
  minimaliseTransform,
  minimalNativeTransform
} from "@times-components-native/jest-serializer";
import { iterator } from "@times-components-native/test-utils";
import "./mocks.native";
import { FontStorage } from "@times-components-native/typeset";
import snapshotTests from "./scaling.base";

FontStorage.registerFont(
  "TimesDigitalW04",
  () => require("@times-components-native/test-utils").TestFont
);
FontStorage.registerFont(
  "TimesDigitalW04-Bold",
  () => require("@times-components-native/test-utils").TestFont
);
FontStorage.registerFont(
  "TimesDigitalW04-Italic",
  () => require("@times-components-native/test-utils").TestFont
);
FontStorage.registerFont(
  "TimesModern-Regular",
  () => require("@times-components-native/test-utils").TestFont
);

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key !== "style"),
      flattenStyleTransform
    )
  );

  iterator(snapshotTests(TestRenderer.create));
};
