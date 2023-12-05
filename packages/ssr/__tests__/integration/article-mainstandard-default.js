import articleTests from "../helpers/article-helper";

articleTests("mainstandard", {
  stickyElements: ["#nav"],
  attachFlags: true,
  skipDropCapCheck: true,
  skipSnapshotTest: true,
  blackoutElements: [
    "[data-testid=save-and-share-bar]",
    '[data-tc-sticky-container="true"]',
    '[class^="sticky-save-and-share-bar__]'
  ]
});
