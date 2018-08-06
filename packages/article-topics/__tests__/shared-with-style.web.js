import {
  addSerializers,
  compose,
  flattenStyleTransform,
  hoistStyleTransform,
  minimaliseTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-with-style.base";

const styles = [
  "borderColor",
  "borderRadius",
  "borderWidth",
  "color",
  "flexDirection",
  "flexWrap",
  "fontFamily",
  "fontSize",
  "justifyContent",
  "marginBottom",
  "marginRight",
  "marginTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop"
];

export default () => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      minimaliseTransform(
        (value, key) => key !== "style" && key !== "className"
      ),
      flattenStyleTransform,
      hoistStyleTransform,
      rnwTransform(styles)
    )
  );

  shared();
};
