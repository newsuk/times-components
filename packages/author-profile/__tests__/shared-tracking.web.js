import shared from "./shared-tracking.base";
import author from "./fixtures";

export default () =>
  shared({
    analyticsStream() {},
    author,
    onNext() {},
    onPrev() {},
    refetch() {},
    slug: "some-slug"
  });
