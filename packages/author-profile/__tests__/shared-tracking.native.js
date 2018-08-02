import shared from "./shared-tracking.base";
import author from "./fixtures";

export default () =>
  shared({
    analyticsStream() {},
    author,
    onArticlePress() {},
    onTwitterLinkPress() {},
    refetch() {},
    slug: "some-slug"
  });
