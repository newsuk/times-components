import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  flattenStyleTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";

const styles = [
  "borderBottomColor",
  "borderBottomWidth",
  "borderStyle",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "width"
];

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    stylePrinter,
    minimalWebTransform,
    flattenStyleTransform
  )
);

// eslint-disable-next-line global-require
require("jest-styled-components");
