import merge from "lodash.merge";

import { makeAdInitMocks, adInit } from "../../fixtures/ad-init-mocks";

const amazonInitExtension = {
  data: {
    prebidConfig: {
      bidders: { amazon: { accountId: "mockAmazonAccount" } },
      timeout: 1234
    }
  }
};

describe("AdInit.prebid", () => {
  let mock;
  let initOptions;

  beforeEach(() => {
    ({ mock, initOptions } = makeAdInitMocks());
  });

  it("perform bidding request for web", () => {
    const init = adInit(initOptions);
    jest.spyOn(init.prebid, "setupAsync");
    init.init();
    expect(init.prebid.setupAsync).toHaveBeenCalledTimes(1);
  });

  it("does not perform bidding request for native", () => {
    const init = adInit({ ...initOptions, platform: "native" });
    jest.spyOn(init.prebid, "setupAsync");
    init.init();
    expect(init.prebid.setupAsync).not.toHaveBeenCalled();
  });

  it("Sets up Amazon bidding if amazon account ID is set", () => {
    const init = adInit(merge(initOptions, amazonInitExtension));
    jest.spyOn(init.prebid, "setupApstag");
    init.init();
    expect(init.prebid.setupApstag).toHaveBeenCalledWith(
      "mockAmazonAccount",
      1234
    );
  });

  it("Does not set up Amazon bidding if no Amazon bidder config is present", () => {
    const init = adInit(
      merge(initOptions, {
        data: { prebidConfig: { bidders: { amazon: null } } }
      })
    );
    jest.spyOn(init.prebid, "setupApstag");
    init.init();
    expect(init.prebid.setupApstag).not.toHaveBeenCalled();
  });

  it("Does not set up Amazon bidding if no Amazon account id is set in the bidder config", () => {
    const init = adInit(
      merge(initOptions, {
        data: { prebidConfig: { bidders: { amazon: { accountId: "" } } } }
      })
    );
    jest.spyOn(init.prebid, "setupApstag");
    init.init();
    expect(init.prebid.setupApstag).not.toHaveBeenCalled();
  });

  it("Fetches bids from Amazon", () => {
    const init = adInit(merge(initOptions, amazonInitExtension));
    init.prebid.setupApstag();
    jest
      .spyOn(mock.window.apstag, "fetchBids")
      .mockImplementation((slots, callback) => {
        callback();
      });
    init.prebid.scheduleRequestAmazonBids([], "", "", "", "");
    expect(mock.window.apstag.fetchBids).toHaveBeenCalled();
  });

  it("Applies prebid targeting on finaliseAds()", () => {
    const init = adInit(initOptions);
    jest.spyOn(init.prebid, "applyPrebidTargeting").mockImplementation();
    init.finaliseAds(true);
    expect(init.prebid.applyPrebidTargeting).toHaveBeenCalled();
  });

  it("requestPrebidBids fetches bids using pbjs", done => {
    const init = adInit(initOptions);
    init.prebid.createPbjsGlobals();
    mock.window.pbjs.addAdUnits = jest.fn();
    jest
      .spyOn(init.prebid, "schedulePrebidAction")
      .mockImplementation(callback => {
        callback();
      });
    mock.window.pbjs.requestBids = jest
      .fn()
      .mockImplementation(options => options.bidsBackHandler([]));
    mock.window.pbjs.removeAdUnit = jest.fn();

    init.prebid
      .requestPrebidBids([{ code: "A" }])
      .then(() => done())
      .catch(error => done(error));

    expect(mock.window.pbjs.removeAdUnit).toHaveBeenCalled();
    expect(mock.window.pbjs.addAdUnits).toHaveBeenCalled();
  });

  it("applyPrebidTargeting calls pbjs.setTargetingForGPTAsync", () => {
    const init = adInit(initOptions);
    init.prebid.createPbjsGlobals();
    mock.window.pbjs.enableSendAllBids = jest.fn();
    mock.window.pbjs.setTargetingForGPTAsync = jest.fn();
    init.prebid.applyPrebidTargeting();
    expect(mock.window.pbjs.setTargetingForGPTAsync).toHaveBeenCalled();
  });

  it("applyAmazonTargeting calls apstag.setDisplayBids", () => {
    const init = adInit(initOptions);
    init.prebid.setupApstag();
    jest.spyOn(mock.window.apstag, "setDisplayBids");
    init.prebid.applyAmazonTargeting();
    expect(mock.window.apstag.setDisplayBids).toHaveBeenCalled();
  });

  it("applyAmazonTargeting does not error if apstag is not set up", () => {
    const init = adInit(initOptions);
    expect(() => {
      init.prebid.applyAmazonTargeting();
    }).not.toThrow();
  });

  it("calculates the ad unit path correctly", () => {
    const init = adInit(initOptions);
    expect(init.prebid.getAdUnitPath(["3048", "d.thetimes.co.uk"])).toEqual(
      "/3048/d.thetimes.co.uk"
    );
  });

  it("get the ad unit path with a commercial section", () => {
    const init = adInit(initOptions);
    expect(
      init.prebid.getAdUnitPath(["3048", "d.thetimes.co.uk", "news"])
    ).toEqual("/3048/d.thetimes.co.uk/news");
  });

  it("get Amazon Config without a commercial section", () => {
    const init = adInit(initOptions);
    const adsSlot = [{ code: "ad-header", sizes: [[970, 250], [970, 90]] }];
    const amazonSlotConfig = [
      {
        slotID: "ad-header",
        slotName: "/3048/d.thetimes.co.uk",
        sizes: [[970, 250], [970, 90]]
      }
    ];
    expect(
      init.prebid.getAmazonConfig(adsSlot, "3048", "d.thetimes.co.uk")
    ).toEqual(amazonSlotConfig);
  });

  it("get Amazon Config with a commercial section", () => {
    const init = adInit(initOptions);
    expect(
      init.prebid.getAmazonConfig([], "3048", "d.thetimes.co.uk", "news")
    ).toEqual([]);
  });

  it("Sets up Amazon apstag", () => {
    const init = adInit(initOptions);
    /* eslint no-underscore-dangle: ["error", { "allow": ["_Q"] }] */
    expect(mock.window.apstag).toEqual(undefined);
    init.prebid.setupApstag("3360", 3000);
    expect(mock.window.apstag._Q).toBeTruthy();
  });

  it("Provides valid fetchBids callback to apstag", () => {
    const init = adInit(initOptions);
    init.prebid.setupApstag("3360", 3000);
    jest.spyOn(mock.window.apstag, "addToQueue");
    mock.window.apstag.fetchBids("bids");
    expect(mock.window.apstag.addToQueue).toHaveBeenCalledWith(
      "f",
      expect.objectContaining(["bids"])
    );
    expect(mock.window.apstag.targetingKeys()).toEqual([]);
  });
});
