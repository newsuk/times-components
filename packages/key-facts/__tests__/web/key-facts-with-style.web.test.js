import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import renderKeyFacts from "../shared-render-key-facts";

const styles = [
  "backgroundColor",
  "color",
  "flexDirection",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "height",
  "letterSpacing",
  "lineHeight",
  "marginBottom",
  "marginTop",
  "paddingLeft",
  "top",
  "transform",
  "width"
];

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(stylePrinter, minimalWebTransform, rnwTransform(styles))
);

renderKeyFacts(mount);

// eslint-disable-next-line global-require
require("jest-styled-components");
