import {
  addSerializers,
  compose,
  flattenStyleTransform,
  hoistStyleTransform,
  minimaliseTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-with-style.base";
import topic from "./fixtures";

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
      hoistStyleTransform
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
