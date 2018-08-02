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
import shared from "./shared-with-style.base";
import author from "./fixtures";

const styles = [
  "alignItems",
  "alignSelf",
  "backgroundColor",
  "borderBottomColor",
  "borderBottomWidth",
  "borderColor",
  "borderRadius",
  "flex",
  "flexDirection",
  "fontFamily",
  "fontSize",
  "height",
  "lineHeight",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "minHeight",
  "overflow",
  "paddingBottom",
  "paddingHorizontal",
  "paddingLeft",
  "paddingTop",
  "paddingVertical",
  "position",
  "textAlign",
  "textDecorationLine",
  "top",
  "WebkitFontSmoothing",
  "width"
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

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  const props = {
    analyticsStream() {},
    author,
    onNext() {},
    onPrev() {},
    refetch() {},
    slug: "some-slug"
  };

  shared(props);
};
