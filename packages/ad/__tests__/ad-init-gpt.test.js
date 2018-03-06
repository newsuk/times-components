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
    expect(init.gpt.scheduleSetPageTargetingValues).toHaveBeenCalledWith({
      pageOptionName: "pageOptionValue"
    });
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
    expect(mock.googletag.display).toHaveBeenCalledWith("mock-code");
  });

  it("displays all ads for web", () => {
    const init = adInit(initOptions);

    init.gpt.displayAds();

    expect(mock.pubAds.refresh).toHaveBeenCalled();
  });

  it("throws if defineSlot returns null", () => {
    const init = adInit(initOptions);
    mock.googletag.defineSlot.mockImplementation(() => null);
    init.init();
    expect(() => mock.processGoogletagCommandQueue()).toThrowError(
      new Error(
        "Ad slot mock-code /mockNetwork/mockAdUnit/mockSection could not be defined, probably it was already defined"
      )
    );
  });
});
