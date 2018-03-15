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

const getSizeMaps = pos => {
  switch (pos) {
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

// Returns the valid ad sizes given the ad pos and window width
const getAdSizes = (pos, width) => {
  const sizeMap = getSizeMaps(pos);
  for (let i = sizeMap.length - 1; i > 0; i -= 1) {
    if (width > sizeMap[i].width) {
      return sizeMap[i].sizes;
    }
  }
  return [];
};

const getSlotConfig = (section, pos, width) => {
  const adSizes = getAdSizes(pos, width);
  const mappings = getSizeMaps(pos);
  const maxSizes = getMaxSizes(adSizes);

  return {
    pos,
    sizes: adSizes,
    maxSizes,
    mappings
  };
};

export { getAdSizes, getSizeMaps, getSlotConfig, getMaxSizes };
