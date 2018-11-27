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
        return (bidResponse.cpm - (bidResponse.cpm % bucketSize)).toFixed(2);
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
        inventory: {
          section
        },
        siteId: biddersConfig.rubicon.siteId,
        zoneId: biddersConfig.rubicon.zoneId
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
  return {
    bids,
    // NOTE: for the prebidding the position of the ad in the page is called code
    code: pos,
    sizes
  };
};

const prebidConfig = {
  bidderSettings
};

export { prebidConfig, getPrebidSlotConfig };
