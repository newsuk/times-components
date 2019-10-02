/* eslint-disable global-require */
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  print,
  minimaliseTransform,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import "./mocks.native";
import { FontStorage } from "@times-components/typeset";
import shared from "./header-with-style.base";

FontStorage.registerFont(
  "TimesDigitalW04-Normal",
  () => require("@times-components/test-utils").TestFont
);
FontStorage.registerFont(
  "TimesDigitalW04-Bold",
  () => require("@times-components/test-utils").TestFont
);
FontStorage.registerFont(
  "TimesDigitalW04-Italic",
  () => require("@times-components/test-utils").TestFont
);
FontStorage.registerFont(
  "TimesModern-Regular",
  () => require("@times-components/test-utils").TestFont
);

const omitKeys = new Set([
  "data",
  "disableVirtualization",
  "horizontal",
  "onViewableItemsChanged",
  "style",
  "testID",
  "viewabilityConfig",
  "viewabilityConfigCallbackPairs"
]);

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => omitKeys.has(key))
    )
  );

  shared(TestRenderer.create);
};
