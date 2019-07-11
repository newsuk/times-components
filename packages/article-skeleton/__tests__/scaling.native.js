import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  print,
  minimaliseTransform,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import "./mocks.native";
import { Text } from "@times-components/text-flow";
import snapshotTests from "./scaling.base";
import Roboto from "./Roboto-Regular-metrics";

Text.FontLoader.loadFont("TimesDigitalW04", Roboto);
Text.FontLoader.loadFont("TimesModern-Regular", Roboto);
Text.FontLoader.loadFont("TimesDigitalW04-Bold", Roboto);
Text.FontLoader.loadFont("TimesDigitalW04-Italic", Roboto);

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
