/* eslint-disable global-require */
import "./mocks.native";

import { FontStorage } from "@times-components/typeset";
import shared from "./shared-tracking.base";

FontStorage.registerFont(
  "TimesDigitalW04",
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

export default shared;
