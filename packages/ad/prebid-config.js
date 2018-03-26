import { getAdSizes } from "./generate-config";

const bidderSettings = ({ maxBid, minPrice, bucketSize }) => ({
  adserverTargeting: [
    {
      key: "hb_bidder",
      val(bidResponse) {
        return bidResponse.bidder;
      }
    },
    {
      key: "hb_adid",
      val(bidResponse) {
        return bidResponse.adId;
      }
    },
    {
      key: "hb_pb",
      val(bidResponse) {
        if (bidResponse.cpm > maxBid) {
          return maxBid.toFixed(2);
        }
        if (bidResponse.cpm < bucketSize) {
          return minPrice.toFixed(2);
        }
        return (bidResponse.cpm - bidResponse.cpm % bucketSize).toFixed(2);
      }
    },
    {
      key: "hb_size",
      val(bidResponse) {
        return bidResponse.size;
      }
    }
  ]
});

const getPrebidSlotConfig = (pos, section, width, biddersConfig) => {
  const sizes = getAdSizes(pos, width);
  const bids = [
    {
      bidder: "appnexus",
      params: {
        placementId: biddersConfig.appnexus.placementId,
        section
      }
    },
    {
      bidder: "rubicon",
      params: {
        accountId: biddersConfig.rubicon.accountId,
        siteId: biddersConfig.rubicon.siteId,
        zoneId: biddersConfig.rubicon.zoneId,
        inventory: {
          section
        }
      }
    },
    {
      bidder: "indexExchange",
      params: {
        id: pos,
        siteID: biddersConfig.indexExchange.siteId
      }
    }
  ];
  sizes.forEach(size => {
    bids.push({
      bidder: "pubmatic",
      params: {
        publisherId: biddersConfig.pubmatic.accountId,
        adSlot: `${biddersConfig.pubmatic.adSlotPrefix}@${size.join("x")}`,
        section
      }
    });

    // Criteo
    const zoneId = biddersConfig.criteo.zoneMap[size.join("x")] || "";
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
    // NOTE: for the prebidding the position of the ad in the page is called code
    code: pos,
    sizes,
    bids
  };
};

const prebidConfig = {
  bidderSettings
};

export { prebidConfig, getPrebidSlotConfig };
