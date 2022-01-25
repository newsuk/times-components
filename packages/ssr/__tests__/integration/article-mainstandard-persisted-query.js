import articleTests from "../helpers/article-helper";

articleTests("mainstandard", {
  qs: "?pq=1",
  variant: "Persisted Query",
  stickyElements: ["#nav"],
  skipSnapshotTest: true,
  blackoutElements: [
    "[data-testid=save-and-share-bar]",
    '[data-tc-sticky-container="true"]',
    '[class^="sticky-save-and-share-bar__]'
  ],
  attachFlags: true,
  skipDropCapCheck: true
});
