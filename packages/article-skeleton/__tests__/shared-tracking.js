/* eslint-disable global-require */
import "./mocks.native";

import { FontStorage } from "@times-components-native/typeset";
import shared from "./shared-tracking.base";

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

export default shared;
