import { jsdom } from "jsdom";
import merge from "lodash.merge";

import { makeAdInitMocks, adInit } from "./ad-init-mocks";
import { expectFunctionToBeSerialisable } from "./check-serialisable-function";

describe("Ad init", () => {
  let mock;
  let initOptions;

  beforeEach(() => {
    const adInitMocks = makeAdInitMocks();
    mock = adInitMocks.mock;
    initOptions = adInitMocks.initOptions;
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
    const init = adInit(
      merge(initOptions, {
        data: {
          prebidConfig: {
            bidders: { amazon: { accountId: "mockAmazonAccount" } },
            timeout: 1234
          }
        }
      })
    );
    jest.spyOn(init.prebid, "setupApstag");
    init.init();
    expect(init.prebid.setupApstag).toHaveBeenCalledWith("mockAmazonAccount", 1234);
  });

  it("Does not set up Amazon bidding if no Amazon bidder config is present", () => {
    const init = adInit(merge(initOptions, { data: { prebidConfig: { bidders: { amazon: null } } } }));
    jest.spyOn(init.prebid, "setupApstag");
    init.init();
    expect(init.prebid.setupApstag).not.toHaveBeenCalled();
  });

  it.skip("scheduleRequestAmazonBids fetches bids from Amazon", () => {
    const init = adInit(merge(initOptions, {data: {prebidConfig: {bidders: {amazon: "mockAmazonAccount"}}}}));
    init.prebid.setupApstag("mockAmazonAccount", 0);
    jest.spyOn(mock.window.apstag, "fetchBids").mockImplementation((config, callback) => { callback(); });
    expect(mock.window.apstag.fetchBids).toHaveBeenCalledWith({"slots": []}, expect.any(Function));
  });

  it("requestPrebidBids fetches bids using pbjs", () => {
    const init = adInit(initOptions);
    jest.spyOn(init.prebid, "schedulePrebidAction").mockImplementation((callback) => { callback(); });
    init.prebid.requestPrebidBids([]);
  });

  it("requestPrebidBids fetches bids using pbjs", () => {
    const init = adInit(initOptions);
    init.prebid.setupAsync({ bidders: { amazon: "mockAmazonAccount" } }, init.utils);
    jest.spyOn(init.prebid, "schedulePrebidAction").mockImplementation(callback => { callback(); });
    mock.window.pbjs = jest.fn().mockImplementation(options => {options.bidsBackHandler([])});
    init.init();
    expect(init.prebid.schedulePrebidAction).toHaveBeenCalled();
  });

  it("Does not set up Amazon bidding if no Amazon account id is set in the bidder config", () => {
    const init = adInit(merge(initOptions, { data: { prebidConfig: { bidders: { amazon: { accountId: "" } } } } }));
    jest.spyOn(init.prebid, "setupApstag");
    init.init();
    expect(init.prebid.setupApstag).not.toHaveBeenCalled();
  });

  it("calculates the ad unit path correctly", () => {
    const init = adInit(initOptions);
    expect(init.prebid.getAdUnitPath(["3048", "d.thetimes.co.uk"])).toEqual(
      "/3048/d.thetimes.co.uk"
    );
  });

  it("get the ad unit path with a commercial section", () => {
    const init = adInit(initOptions);
    expect(init.prebid.getAdUnitPath(["3048", "d.thetimes.co.uk", "news"])).toEqual(
      "/3048/d.thetimes.co.uk/news"
    );
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
    expect(init.prebid.getAmazonConfig(adsSlot, "3048", "d.thetimes.co.uk")).toEqual(
      amazonSlotConfig
    );
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
    expect(mock.window.apstag.addToQueue).toHaveBeenCalledWith("f", expect.objectContaining(["bids"]));
    expect(mock.window.apstag.targetingKeys()).toEqual([]);
  });
});
