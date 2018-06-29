import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  stylePrinter,
  rnwTransform
} from "@times-components/jest-serializer";
import { mount } from "enzyme";
import shared from "./shared.base";

const styles = [
  "alignItems",
  "backgroundColor",
  "borderRadius",
  "color",
  "fontFamily",
  "fontSize",
  "height",
  "justifyContent",
  "minWidth",
  "paddingTop",
  "width"
];

const accessibleAttributes = new Set(["aria-label", "role", "tabIndex"]);

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      stylePrinter,
      minimalWebTransform,
      rnwTransform(styles),
      minimaliseTransform((value, key) => accessibleAttributes.has(key))
    )
  );

  shared(mount);
};
