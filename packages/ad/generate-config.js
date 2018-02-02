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

const getSizeMaps = code => {
  switch (code) {
    case "ad-header":
      return sizes.header;
    case "ad-pixel":
    case "ad-pixelskin":
    case "ad-pixelteads":
    case "ad-article-sponsored":
      return sizes.pixel;
    default:
      return sizes.intervention;
  }
};

// Returns the valid ad sizes given the ad code and window width
const getAdSizes = (code, width) => {
  const sizeMap = getSizeMaps(code);
  for (let i = sizeMap.length - 1; i > 0; i -= 1) {
    if (width > sizeMap[i].width) {
      return sizeMap[i].sizes;
    }
  }
  return [];
};

const getSlotConfig = (section, code, width) => {
  const adSizes = getAdSizes(code, width);
  const mappings = getSizeMaps(code);
  const maxSizes = getMaxSizes(adSizes);

  return {
    code,
    sizes: adSizes,
    maxSizes,
    mappings
  };
};

export { getAdSizes, getSizeMaps, getSlotConfig, getMaxSizes };
