import sizes from "./sizes";

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

const slotPositions = {
  "ad-header": 1,
  "ad-pixel": 2,
  "ad-pixelskin": 2,
  "ad-pixelteads": 2,
  "article-sponsored-ad": 2,
  default: 0,
  header: 1,
  pixel: 2,
  pixelskin: 2,
  pixelteads: 2
};

const sizeMap = {
  "ad-header": sizes.header,
  "ad-pixel": sizes.pixel,
  "ad-pixelskin": sizes.pixelskin,
  "ad-pixelteads": sizes.pixelteads,
  "article-sponsored-ad": sizes.pixel,
  default: sizes.intervention,
  header: sizes.header,
  "native-inline-ad": sizes.native,
  pixel: sizes.pixel,
  pixelskin: sizes.pixel,
  pixelteads: sizes.pixel
};

const getAdSizes = (adSizeMap, width) => {
  for (let i = adSizeMap.length - 1; i >= 0; i -= 1) {
    if (width >= adSizeMap[i].width) {
      return adSizeMap[i].sizes;
    }
  }
  return [];
};

const getSlotConfig = (slotName, width) => {
  const mappings = sizeMap[slotName] || sizeMap.default;
  const adSizes = getAdSizes(mappings, width);
  const maxSizes = getMaxSizes(adSizes);

  return {
    mappings,
    maxSizes,
    sizes: adSizes,
    slotName
  };
};

export { getAdSizes, getSlotConfig, getMaxSizes, slotPositions };
