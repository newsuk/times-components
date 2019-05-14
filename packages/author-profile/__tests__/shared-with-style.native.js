import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared-with-style.base";
import author from "./fixtures";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key !== "style"),
      flattenStyleTransform
    )
  );

  const props = {
    analyticsStream() {},
    author,
    onArticlePress() {},
    onTwitterLinkPress() {},
    refetch() {},
    slug: "some-slug"
  };

  shared(props);
};
