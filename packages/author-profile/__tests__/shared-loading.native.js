import {
  addSerializers,
  compose,
  minimalNativeTransform,
  print,
  replacePropTransform
} from "@times-components/jest-serializer";
import { hash } from "@times-components/test-utils";
import shared from "./shared-loading.base";
import author from "./fixtures";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      replacePropTransform(
        (value, key) => (key === "emptyStateMessage" ? hash(value) : value)
      )
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
