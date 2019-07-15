import "./mocks.native";

import { Text } from "@times-components/text-flow";
import { Roboto } from "@times-components/test-utils";
import shared from "./shared-tracking.base";

Text.FontLoader.loadFont("TimesDigitalW04", Roboto);
Text.FontLoader.loadFont("TimesModern-Regular", Roboto);
Text.FontLoader.loadFont("TimesDigitalW04-Bold", Roboto);
Text.FontLoader.loadFont("TimesDigitalW04-Italic", Roboto);

export default shared;
