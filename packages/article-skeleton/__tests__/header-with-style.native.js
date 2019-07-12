import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  print,
  minimaliseTransform,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import "./mocks.native";
import { Text } from "@times-components/text-flow";
import { Roboto } from "@times-components/test-utils";
import shared from "./header-with-style.base";

Text.FontLoader.loadFont("TimesDigitalW04", Roboto);
Text.FontLoader.loadFont("TimesModern-Regular", Roboto);
Text.FontLoader.loadFont("TimesDigitalW04-Bold", Roboto);
Text.FontLoader.loadFont("TimesDigitalW04-Italic", Roboto);

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
