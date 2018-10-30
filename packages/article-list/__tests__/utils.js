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
  "onViewableItemsChanged",
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
