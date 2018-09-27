export const omitNative = new Set([
  "accessibilityID",
  "data",
  "disableVirtualization",
  "horizontal",
  "initialNumToRender",
  "ListHeaderComponent",
  "maxToRenderPerBatch",
  "numColumns",
  "onEndReachedThreshold",
  "pageSize",
  "scrollEventThrottle",
  "style",
  "testID",
  "updateCellsBatchingPeriod",
  "viewabilityConfig",
  "viewabilityConfigCallbackPairs",
  "windowSize"
]);

export const omitWeb = new Set(["className", "data-testid", "style"]);

export const makeUrl = ({ slug, shortIdentifier }) =>
  `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`;
