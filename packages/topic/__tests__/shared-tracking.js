import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print,
  replacePropTransform
} from "@times-components/jest-serializer";
import { hash } from "@times-components/test-utils";
import shared from "./shared-tracking.base";
import topic from "./fixtures";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) =>
          key === "style" || key === "className" || key === "data-testid"
      ),
      replacePropTransform(
        (value, key) => (key === "emptyStateMessage" ? hash(value) : value)
      )
    )
  );

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
