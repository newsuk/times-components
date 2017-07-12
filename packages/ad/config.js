// Sizes
const leaderboard = [728, 90];
const wideLeaderboard = [970, 90];
const billboard = [970, 250];
const mobileStandard = [300, 50];

const sizes = {
  header: [
    {
      width: 0,
      height: 0,
      sizes: []
    },
    {
      width: 300,
      height: 100,
      sizes: [[320, 50], [320, 48], mobileStandard]
    },
    {
      width: 768,
      height: 90,
      sizes: [leaderboard]
    },
    {
      width: 1024,
      height: 250,
      sizes: [billboard, wideLeaderboard, leaderboard]
    }
  ],
  intervention: [
    {
      width: 0,
      height: 0,
      sizes: []
    },
    {
      width: 300,
      height: 100,
      sizes: [[300, 250], [320, 50], [320, 48], mobileStandard]
    },
    {
      width: 768,
      height: 90,
      sizes: [leaderboard]
    },
    {
      width: 1024,
      height: 250,
      sizes: [billboard, wideLeaderboard, leaderboard]
    }
  ],
  pixel: [
    {
      width: 0,
      height: 0,
      sizes: [[1, 1]]
    }
  ]
};

const bidders = {
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
    accountId: "01234",
    adSlotPrefix: "TheTimes"
  },
  indexExchange: {
    siteId: "1234"
  }
};

// Prebid JS config
const pbjs = {
  timeout: 1000,
  minPrice: 0.01,
  maxBid: 15,
  bucketSize: 0.25,
  bidders
};

export { pbjs, sizes, bidders };
