import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  hoistStyleTransform,
  minimaliseTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-std-with-style.base";

const styles = [
  "alignItems",
  "borderBottomColor",
  "borderBottomWidth",
  "borderStyle",
  "borderTopColor",
  "borderTopWidth",
  "color",
  "display",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "height",
  "justifyContent",
  "lineHeight",
  "marginBottom",
  "marginTop"
];

jest.mock("@times-components/card", () => "Card");
jest.mock("@times-components/link", () => "Link");

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      stylePrinter,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => key !== "style" && key !== "className"
      ),
      rnwTransform(styles),
      hoistStyleTransform
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  shared(TestRenderer.create);
};
