import articleTests from "../helpers/article-helper";

articleTests("magazinecomment", {
  stickyElements: ["#nav"],
  attachFlags: true,
  blackoutElements: [
    "[data-testid=save-and-share-bar]",
    '[data-tc-sticky-container="true"]',
    '[class^="sticky-save-and-share-bar__]'
  ]
});
