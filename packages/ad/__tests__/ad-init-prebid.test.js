
import { jsdom } from "jsdom";

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

  it("does not perform bidding request for native", () => {
    const nativeInitOptions = Object.assign(initOptions, {
      platform: "native"
    });
    const nativeInit = adInit(nativeInitOptions);

    jest.spyOn(nativeInit.prebid, "setupAsync");

    nativeInit.init();

    expect(nativeInit.prebid.setupAsync).toHaveBeenCalledTimes(0);
  });

  it("calculates the ad unit path correctly", () => {
    const init = adInit(initOptions);
    expect(init.prebid.getAdUnitPath(["3048", "d.thetimes.co.uk"])).toEqual(
      "/3048/d.thetimes.co.uk"
    );
  });

  it.skip("get the ad unit path with a commercial section", () => {
    const init = adInit(initOptions);
    expect(init.getAdUnitPath(["3048", "d.thetimes.co.uk", "news"])).toEqual(
      "/3048/d.thetimes.co.uk/news"
    );
  });

  it.skip("get Amazon Config without a commercial section", () => {
    const init = adInit(initOptions);
    const adsSlot = [{ code: "ad-header", sizes: [[970, 250], [970, 90]] }];
    const amazonSlotConfig = [
      {
        slotID: "ad-header",
        slotName: "/3048/d.thetimes.co.uk",
        sizes: [[970, 250], [970, 90]]
      }
    ];
    expect(init.getAmazonConfig(adsSlot, "3048", "d.thetimes.co.uk")).toEqual(
      amazonSlotConfig
    );
  });

  it.skip("get Amazon Config with a commercial section", () => {
    const init = adInit(initOptions);
    expect(
      init.getAmazonConfig([], "3048", "d.thetimes.co.uk", "news")
    ).toEqual([]);
  });

  // TODO APSTAG
  it.skip("setup and init Amazon apstag", () => {
    const init = adInit(initOptions);
    /* eslint no-underscore-dangle: ["error", { "allow": ["_Q"] }] */
    expect(window.apstag).toEqual(undefined);
    init.configureApstag();
    expect(window.apstag._Q).toEqual([]);

    init.initApstag("3360", 3000);
    expect(window.apstag._Q).not.toBe([]);
  });
});
