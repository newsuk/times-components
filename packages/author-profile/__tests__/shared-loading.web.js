import {
  addSerializers,
  compose,
  minimalWebTransform,
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
      minimalWebTransform,
      replacePropTransform(
        (value, key) => (key === "emptyStateMessage" ? hash(value) : value)
      )
    )
  );

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
