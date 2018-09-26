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

const config = {
  get() {
    return "www.thetimes.co.uk";
  }
};

export const makeUrl = ({slug, shortIdentifier}) => {
  if (process.env.NODE_ENV === "local" && !process.env.IS_E2E_CI) {
    return `${config.get("render:host")}/${config.get("render:port")}/article/${
      slug
    }-${shortIdentifier}`;
  }
  return `${config.get("render:host")}/article/${slug}-${shortIdentifier}`;
};
