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
import topic from "./fixtures";

const styles = [
  "alignItems",
  "backgroundColor",
  "borderBottomColor",
  "borderBottomWidth",
  "borderStyle",
  "borderTopColor",
  "borderTopWidth",
  "color",
  "flexDirection",
  "fontFamily",
  "fontSize",
  "justifyContent",
  "lineHeight",
  "marginBottom",
  "minHeight",
  "paddingHorizontal",
  "paddingTop",
  "textAlign",
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
    onNext() {},
    onPrev() {},
    refetch() {},
    slug: "some-slug",
    topic
  };

  shared(props);
};
