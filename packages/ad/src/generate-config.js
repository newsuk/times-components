import sizes from "./sizes";

// Given all the valid ad sizes returns the maximum height possible
// for the element
const getMaxSizes = adSizes => {
  if (!adSizes) {
    return { width: 0, height: 0 };
  }

  return adSizes.reduce(
    (max, [curWidth, curHeight]) => ({
      width: Math.max(max.width, curWidth),
      height: Math.max(max.height, curHeight)
    }),
    { width: 0, height: 0 }
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
    default:
      return sizes.intervention;
  }
};

// Returns the valid ad sizes given the ad slotName and window width
const getAdSizes = (slotName, width) => {
  const sizeMap = getSizeMaps(slotName);
  for (let i = sizeMap.length - 1; i > 0; i -= 1) {
    if (width > sizeMap[i].width) {
      return sizeMap[i].sizes;
    }
  }
  return [];
};

const getSlotConfig = (section, slotName, width) => {
  const adSizes = getAdSizes(slotName, width);
  const mappings = getSizeMaps(slotName);
  const maxSizes = getMaxSizes(adSizes);

  return {
    slotName,
    sizes: adSizes,
    maxSizes,
    mappings
  };
};

export { getAdSizes, getSizeMaps, getSlotConfig, getMaxSizes };
