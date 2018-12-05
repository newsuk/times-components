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

export default () => {
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

  it("sets up Amazon bidding if amazon account ID is set", () => {
    const option = merge(initOptions, amazonInitExtension);
    const init = adInit(option);
    jest.spyOn(init.prebid, "setupApstag");
    const { networkId, adUnit, prebidConfig, section, slots } = option.data;
    init.prebid.requestBidsAsync(
      prebidConfig,
      slots,
      networkId,
      adUnit,
      section
    );
    expect(init.prebid.setupApstag).toHaveBeenCalledWith(
      "mockAmazonAccount",
      1234
    );
  });

  it("does not set up Amazon bidding if no Amazon bidder config is present", () => {
    const init = adInit(
      merge(initOptions, {
        data: { prebidConfig: { bidders: { amazon: null } } }
      })
    );
    jest.spyOn(init.prebid, "setupApstag");
    init.init();
    expect(init.prebid.setupApstag).not.toHaveBeenCalled();
  });

  it("does not set up Amazon bidding if no Amazon account id is set in the bidder config", () => {
    const init = adInit(
      merge(initOptions, {
        data: { prebidConfig: { bidders: { amazon: { accountId: "" } } } }
      })
    );
    jest.spyOn(init.prebid, "setupApstag");
    init.init();
    expect(init.prebid.setupApstag).not.toHaveBeenCalled();
  });

  it("does not fetches bids from Amazon when there are no ad slots", () => {
    const init = adInit(merge(initOptions, amazonInitExtension));
    init.prebid.setupApstag();
    jest
      .spyOn(mock.window.apstag, "fetchBids")
      .mockImplementation((slots, callback) => {
        callback();
      });
    init.prebid.scheduleRequestAmazonBids([], "", "", "", "");
    expect(mock.window.apstag.fetchBids).not.toHaveBeenCalled();
  });

  it("fetches bids from Amazon when there are ad slots", () => {
    const init = adInit(merge(initOptions, amazonInitExtension));
    init.prebid.setupApstag();
    jest
      .spyOn(mock.window.apstag, "fetchBids")
      .mockImplementation((slots, callback) => {
        callback();
      });
    init.prebid.scheduleRequestAmazonBids(
      [
        {
          ad1: "test"
        }
      ],
      "",
      "",
      "",
      ""
    );
    expect(mock.window.apstag.fetchBids).toHaveBeenCalled();
  });

  it("requestPrebidBids fetches bids using pbjs", done => {
    const init = adInit(initOptions);
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
        sizes: [[970, 250], [970, 90]],
        slotID: "ad-header",
        slotName: "/3048/d.thetimes.co.uk"
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

  it("sets up Amazon apstag", () => {
    const init = adInit(initOptions);
    /* eslint no-underscore-dangle: ["error", { "allow": ["_Q"] }] */
    init.prebid.setupApstag("3360", 3000);
    expect(mock.window.apstag._Q).toBeTruthy();
  });

  it("provides valid fetchBids callback to apstag", () => {
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
};
