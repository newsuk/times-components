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

  it("configures googletag on page init", () => {
    const init = adInit(initOptions);

    jest.spyOn(init.gpt, "scheduleSetPageTargetingValues");

    init.init();
    expect(init.gpt.scheduleSetPageTargetingValues).toHaveBeenCalledWith({ pageOptionName: "pageOptionValue" });
  });

  it("configures slots on slot init", () => {
    const init = adInit(initOptions);
    init.initializeBidding = jest.fn();
    init.scheduleGPTConfiguration = jest.fn();

    init.init();
    mock.processGoogletagCommandQueue();
    expect(mock.sizeMapping.addSize).toHaveBeenCalledWith([100, 250], [[1, 1]]);
    expect(mock.slot.setTargeting).toHaveBeenCalledWith(
      "slotOptionName",
      "slotOptionValue"
    );
  });

  it.skip("displays all ads for web", () => {

    const init = adInit(initOptions);

    init.init();

    expect(mock.googletag.display).toHaveBeenCalled();
    expect(mock.pubAds.refresh).not.toHaveBeenCalled();
  });

  it.skip("displays all ads for native", () => {
    const nativeInitOptions = Object.assign(initOptions, {
      platform: "native"
    });
    const nativeInit = adInit(nativeInitOptions);
    jest.spyOn(nativeInit, "dfpReady");

    nativeInit.init();
    //FIXME use mock.processGoogletagCommandQueue
    nativeInitOptions.window.googletag.cmd.forEach(cmd => cmd());
    nativeInitOptions.window.googletag.cmd = [];

    expect(nativeInitOptions.window.googletag.display).toHaveBeenCalled(); // when slot is define
    expect(nativeInit.dfpReady).toHaveBeenCalled();
  });

  it.skip("throws if defineSlot returns null", () => {
    const init = adInit(initOptions);
    mock.googletag.defineSlot.mockImplementation(() => null);

    init.initializeBidding = jest.fn();
    init.scheduleGPTConfiguration = jest.fn();

    // init.doPageAdSetupAsync = jest.fn();

    init.init();
    expect(processGoogletagCommandQueue).toThrowError(
      new Error(
        "Ad slot mock-code /mockNetwork/mockAdUnit/mockSection could not be defined, probably it was already defined"
      )
    );
  });
});
