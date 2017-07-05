import { bidders, sizes } from "./config";

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
  const bids = [
    {
      bidder: "appnexus",
      params: {
        placementId: bidders.appnexus.placementId,
        section
      }
    },
    {
      bidder: "rubicon",
      params: {
        accountId: bidders.rubicon.accountId,
        siteId: bidders.rubicon.siteId,
        zoneId: bidders.rubicon.zoneId,
        inventory: { section }
      }
    },
    {
      bidder: "indexExchange",
      params: {
        id: code,
        siteID: bidders.indexExchange.siteId
      }
    }
  ];

  adSizes.forEach(size => {
    bids.push({
      bidder: "pubmatic",
      params: {
        publisherId: bidders.pubmatic.accountId,
        adSlot: `${bidders.pubmatic.adSlotPrefix}@${size.join("x")}`,
        section
      }
    });

    // Criteo
    const zoneId = bidders.criteo.zoneMap[size.join("x")] || "";
    if (zoneId) {
      bids.push({
        bidder: "criteo",
        params: {
          zoneId
        }
      });
    }
  });

  return {
    code,
    sizes: adSizes,
    mappings,
    bids
  };
};

export { getAdSizes, getSizeMaps, getSlotConfig };
