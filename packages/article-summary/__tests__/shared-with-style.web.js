import {
  addSerializers,
  compose,
  hoistStyleTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-with-style.base";

export default () => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      hoistStyleTransform,
      rnwTransform([
        "color",
        "flexWrap",
        "fontFamily",
        "fontSize",
        "fontWeight",
        "lineHeight",
        "marginBottom"
      ]),
      minimalWebTransform
    )
  );

  shared();
};
