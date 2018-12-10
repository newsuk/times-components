module.exports = {
  defaultClient: {
    adUnit: "d.thetimes.co.uk",
    biddersConfig: {
      bidders: {
        amazon: {
          accountId: "3360",
          slots: []
        },
        appnexus: {
          placementId: "5823281"
        },
        ix: {
          siteId: "1234"
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
    bidInitialiser: false,
    debug: true,
    disabled: false,
    globalSlots: [],
    networkId: "25436805"
  },

  defaultServer: {
    adUnit: "d.thetimes.co.uk",
    biddersConfig: {
      bidders: {
        amazon: {
          accountId: "3360"
        },
        appnexus: {
          placementId: "5823281"
        },
        ix: {
          siteId: "1234"
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
    bidInitialiser: false,
    debug: true,
    disabled: false,
    globalSlots: [],
    networkId: "25436805",
    pageTargeting: {},
    slotTargeting: {}
  }
};
