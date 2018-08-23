export const omitNative = new Set([
  "accessibilityID",
  "bylineProps",
  "data",
  "datePublicationProps",
  "disableVirtualization",
  "horizontal",
  "initialNumToRender",
  "labelProps",
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

export const omitWeb = new Set([
  "className",
  "bylineProps",
  "data-testid",
  "datePublicationProps",
  "labelProps",
  "style"
]);
