import { AppRegistry } from "react-native-web";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  flattenStyleTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";

jest.mock("@times-components/styleguide");

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
    flattenStyleTransform,
    rnwTransform(AppRegistry, styles)
  )
);

// eslint-disable-next-line global-require
require("jest-styled-components");
