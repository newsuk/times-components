import { AppRegistry } from "react-native-web";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  hoistStyleTransform,
  minimaliseTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-error.base.web";

const keepProps = new Set(["class", "className", "style"]);

const styles = [
  "alignItems",
  "alignSelf",
  "backgroundColor",
  "borderBottomWidth",
  "borderColor",
  "borderTopWidth",
  "bottom",
  "color",
  "flex",
  "flexDirection",
  "fontFamily",
  "fontSize",
  "height",
  "justifyContent",
  "margin",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginTop",
  "maxWidth",
  "minHeight",
  "paddingBottom",
  "paddingTop",
  "paddingVertical",
  "position",
  "right",
  "textAlign",
  "viewBox",
  "width"
];

export default () => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => !keepProps.has(key) && !key.includes("Class")
      ),
      rnwTransform(AppRegistry, styles),
      flattenStyleTransform,
      hoistStyleTransform
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  shared();
};
