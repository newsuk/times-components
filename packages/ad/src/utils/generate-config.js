import sizes from "./sizes";

// Given all the valid ad sizes returns the maximum height possible
// for the element
const getMaxSizes = adSizes => {
  if (!adSizes) {
    return { height: 0, width: 0 };
  }

  return adSizes.reduce(
    (max, [curWidth, curHeight]) => ({
      height: Math.max(max.height, curHeight),
      width: Math.max(max.width, curWidth)
    }),
    { height: 0, width: 0 }
  );
};

const getSizeMaps = slotName => {
  switch (slotName) {
    case "header":
      return sizes.header;
    case "pixel":
    case "pixelskin":
    case "pixelteads":
    case "article-sponsored-ad":
      return sizes.pixel;
    case "native-inline-ad":
      return sizes.native;
    default:
      return sizes.intervention;
  }
};

// Returns the valid ad sizes given the ad slotName and window width
const getAdSizes = (sizeMap, width) => {
  for (let i = sizeMap.length - 1; i >= 0; i -= 1) {
    if (width >= sizeMap[i].width) {
      return sizeMap[i].sizes;
    }
  }
  return [];
};

const getSlotConfig = (slotName, width) => {
  const mappings = getSizeMaps(slotName);
  const adSizes = getAdSizes(mappings, width);
  const maxSizes = getMaxSizes(adSizes);

  return {
    mappings,
    maxSizes,
    sizes: adSizes,
    slotName
  };
};

export { getAdSizes, getSizeMaps, getSlotConfig, getMaxSizes };
