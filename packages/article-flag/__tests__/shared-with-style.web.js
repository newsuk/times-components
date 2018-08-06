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
import "./mocks";
import shared from "./shared-with-style.base";

const styles = [
  "alignItems",
  "flexDirection",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "letterSpacing",
  "marginBottom",
  "marginRight"
];

export default () => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      minimalWebTransform,
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
