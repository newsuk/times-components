import articleTests from "../../helpers/author-profile-helper";
// const authorProfileTests = require('../../helpers/author-profile-helper')

articleTests("indepth", {
  stickyElements: ["#nav"],
  attachFlags: true,
  skipSnapshotTest: true,
  blackoutElements: [
    "[data-testid=save-and-share-bar]",
    '[data-tc-sticky-container="true"]',
    '[class^="sticky-save-and-share-bar__]'
  ]
});