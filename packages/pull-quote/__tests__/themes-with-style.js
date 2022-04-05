import { AppRegistry } from "react-native-web";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  hoistStyleTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import tests from "./themes-with-style.base";

jest.mock("@times-components/link", () => ({
  TextLink: "TextLink"
}));
jest.mock("@times-components/link", () => ({
  TimesTextLink: "TimesTextLink"
}));
jest.mock("@times-components/icons", () => ({
  IconTwitter: "IconTwitter"
}));

export default () => {
  const styles = [
    "alignItems",
    "borderLeftWidth",
    "borderLeftColor",
    "color",
    "display",
    "flexDirection",
    "fontFamily",
    "fontSize",
    "height",
    "lineHeight",
    "marginBottom",
    "marginLeft",
    "marginTop",
    "paddingLeft",
    "textDecorationLine"
  ];

  addSerializers(
    expect,
    compose(
      stylePrinter,
      minimalWebTransform,
      flattenStyleTransform,
      hoistStyleTransform,
      rnwTransform(AppRegistry, styles)
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  iterator(tests);
};
