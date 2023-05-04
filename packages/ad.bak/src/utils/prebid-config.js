import { getSlotConfig, slotPositions } from "./generate-config";

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

const getPrebidSlotConfig = (slot, section, width, biddersConfig) => {
  const position = slotPositions[slot] || slotPositions.default;
  const { sizes } = getSlotConfig(slot, width);
  let bids = [];
  if (biddersConfig.ix && biddersConfig.ix.siteId) {
    bids = bids.concat(
      sizes.map(size => ({
        bidder: "ix",
        params: {
          siteId: biddersConfig.ix.siteId,
          size
        }
      }))
    );
  }
  if (biddersConfig.appnexus && biddersConfig.appnexus.placementId) {
    bids.push({
      bidder: "appnexus",
      params: {
        keywords: {
          pos: position,
          section
        },
        placementId: biddersConfig.appnexus.placementId,
        position
      }
    });
  }
  if (biddersConfig.rubicon && biddersConfig.rubicon.accountId) {
    bids.push({
      bidder: "rubicon",
      params: {
        accountId: biddersConfig.rubicon.accountId,
        keywords: [section],
        position: position === 1 ? "atf" : "btf",
        siteId: biddersConfig.rubicon.siteId,
        zoneId: biddersConfig.rubicon.zoneId
      }
    });
  }
  return {
    bids,
    code: slot,
    mediaTypes: {
      banner: {
        sizes
      }
    },
    sizes
  };
};

const prebidConfig = {
  bidderSettings,
  init: {
    bidderSequence: "random",
    bidTimeout: 3000,
    cache: {
      url: "https://prebid.adnxs.com/pbc/v1/cache"
    },
    consentManagement: {
      allowAuctionWithoutConsent: true,
      cmpApi: "iab",
      timeout: 3000
    },
    disableAjaxTimeout: false,
    enableSendAllBids: true,
    maxRequestsPerOrigin: 4,
    priceGranularity: "medium",
    timeoutBuffer: 400,
    userSync: {
      enableOverride: false,
      syncDelay: 3000,
      syncEnabled: true,
      syncsPerBidder: 5
    }
  }
};

export { prebidConfig, getPrebidSlotConfig };
