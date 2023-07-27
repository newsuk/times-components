export default "Ad";
export const AdComposer = ({ children }) => children;

export const adConfig = {
  adUnit: "mockAdUnit",
  biddersConfig: {
    bidders: {
      amazon: {
        accountId: "3360"
      },
      appnexus: {
        placementId: "5823281"
      },
      criteo: {
        zoneMap: {
          "120x600": "764877"
        }
      },
      ix: {
        siteId: "188830"
      },
      pubmatic: {
        accountId: "156034",
        adSlotPrefix: "Thetimes"
      },
      rubicon: {
        accountId: "14062",
        siteId: "70608",
        zoneId: "335918"
      }
    },
    bucketSize: 0.25,
    maxBid: 15,
    minPrice: 0.01,
    timeout: 3000
  },
  bidderSlots: ["header", "inline-ad"],
  bidInitialiser: Promise.resolve(),
  globalSlots: ["ad-pixel", "ad-pixelskin", "ad-pixelteads"],
  networkId: "mockNetwork",
  pageTargeting: {
    title: "Title"
  },
  slotTargeting: {
    path: "/news"
  }
};
