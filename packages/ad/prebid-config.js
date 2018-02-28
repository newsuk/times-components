import { getAdSizes } from "./generate-config";

const timeout = 3000;
const minPrice = 0.01;
const maxBid = 15;
const bucketSize = 0.25;

const biddersConfig = {
  appnexus: {
    placementId: "5823281"
  },
  rubicon: {
    accountId: "14062",
    siteId: "70608",
    zoneId: "335918"
  },
  amazon: {
    accountId: "3360"
  },
  criteo: {
    zoneMap: {
      "120x600": "764877",
      "160x600": "764878",
      "300x100": "764885",
      "300x250": "764879",
      "300x600": "764880",
      "320x50": "764882",
      "728x90": "764881",
      "970x250": "764883",
      "970x90": "764884"
    }
  },
  pubmatic: {
    accountId: "156034",
    adSlotPrefix: "Thetimes"
  },
  indexExchange: {
    siteId: "188830"
  }
};

const bidderSettings = {
  standard: {
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
  }
};

const getPrebidSlotConfig = (pos, section, width) => {
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
  timeout,
  minPrice,
  maxBid,
  bucketSize,
  bidders: biddersConfig,
  bidderSettings
};

export { prebidConfig, getPrebidSlotConfig };
