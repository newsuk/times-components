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

  it("does not set up Amazon bidding if amazon account ID is not set", () => {
    const init = adInit(
      merge(initOptions, {
        data: { prebidConfig: { bidders: { amazon: {} } } }
      })
    );
    jest.spyOn(init.apstag, "process");
    jest.spyOn(init.apstag, "init");
    jest.spyOn(init.apstag, "bid");
    init.init();
    expect(init.apstag.process).toHaveBeenCalled();
    expect(init.apstag.init).not.toHaveBeenCalled();
    expect(init.apstag.bid).not.toHaveBeenCalled();
  });

  it("does set up Amazon bidding if amazon account ID is set", () => {
    const init = adInit(merge(initOptions, amazonInitExtension));
    jest.spyOn(init.apstag, "process");
    jest.spyOn(init.apstag, "init");
    jest.spyOn(init.apstag, "bid");
    init.init();
    expect(init.apstag.process).toHaveBeenCalled();
    expect(init.apstag.init).toHaveBeenCalled();
    expect(init.apstag.bid).toHaveBeenCalled();
  });

  it("does not set up Amazon bidding if no Amazon bidder config is present", () => {
    const init = adInit(
      merge(initOptions, {
        data: { prebidConfig: { bidders: { amazon: null } } }
      })
    );
    jest.spyOn(init.apstag, "init");
    init.init();
    expect(init.apstag.init).not.toHaveBeenCalled();
  });

  it("does not set up Amazon bidding if no Amazon account id is set in the bidder config", () => {
    const init = adInit(
      merge(initOptions, {
        data: { prebidConfig: { bidders: { amazon: { accountId: "" } } } }
      })
    );
    jest.spyOn(init.apstag, "init");
    init.init();
    expect(init.apstag.init).not.toHaveBeenCalled();
  });

  it("does not fetches bids from Amazon when there are no ad slots", () => {
    const init = adInit(merge(initOptions, amazonInitExtension));
    jest.spyOn(init.apstag, "getConfig").mockReturnValue([]);
    jest
      .spyOn(mock.window.apstag, "fetchBids")
      .mockImplementation((slots, callback) => {
        callback();
      });
    init.apstag.bid();
    expect(mock.window.apstag.fetchBids).not.toHaveBeenCalled();
  });

  it("fetches bids from Amazon when there are ad slots", () => {
    const init = adInit(merge(initOptions, amazonInitExtension));
    jest
      .spyOn(mock.window.apstag, "fetchBids")
      .mockImplementation((slots, callback) => {
        callback();
      });
    jest
      .spyOn(init.apstag, "getConfig")
      .mockReturnValue([{ code: "ad-header", sizes: [[970, 250], [970, 90]] }]);
    init.apstag.bid();
    expect(mock.window.apstag.fetchBids).toHaveBeenCalled();
  });

  it("get Amazon Config with a commercial section", () => {
    const init = adInit(initOptions);
    const slots = [{ code: "ad-header", sizes: [[970, 250], [970, 90]] }];
    const amazonSlotConfig = [
      {
        sizes: [[970, 250], [970, 90]],
        slotID: "ad-header",
        slotName: "/3048/d.thetimes.co.uk"
      }
    ];
    expect(
      init.apstag.getConfig({
        slots,
        networkId: "3048",
        adUnit: "d.thetimes.co.uk"
      })
    ).toEqual(amazonSlotConfig);
  });

  it("get empty Amazon Config without a commercial section", () => {
    const init = adInit(initOptions);
    expect(
      init.apstag.getConfig({
        slots: [],
        networkId: "3048",
        adUnit: "d.thetimes.co.uk",
        section: "news"
      })
    ).toEqual([]);
  });

  it("sets up Amazon apstag", () => {
    const init = adInit(initOptions);
    /* eslint no-underscore-dangle: ["error", { "allow": ["_Q"] }] */
    init.apstag.init("3360", 3000);
    expect(mock.window.apstag._Q).toBeTruthy();
  });

  it("provides valid fetchBids callback to apstag", () => {
    const init = adInit(initOptions);
    init.apstag.init("3360", 3000);
    jest.spyOn(mock.window.apstag, "addToQueue");
    mock.window.apstag.fetchBids("bids");
    expect(mock.window.apstag.addToQueue).toHaveBeenCalledWith(
      "f",
      expect.objectContaining(["bids"])
    );
    expect(mock.window.apstag.targetingKeys()).toEqual([]);
  });
};
