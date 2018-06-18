import merge from "lodash.merge";

import { makeAdInitMocks, adInit } from "../../fixtures/ad-init-mocks";

describe("AdInit.gpt", () => {
  let mock;
  let initOptions;

  beforeEach(() => {
    ({ mock, initOptions } = makeAdInitMocks());
  });

  it("configures googletag on page init", () => {
    const init = adInit(initOptions);

    jest.spyOn(init.gpt, "scheduleSetPageTargetingValues");

    init.init();
    expect(init.gpt.scheduleSetPageTargetingValues).toHaveBeenCalledWith({
      pageOptionName: "pageOptionValue"
    });
  });

  it("sets the window.googletag global on page init", () => {
    const init = adInit(initOptions);
    delete mock.window.googletag;
    init.gpt.setupAsync(init.utils);
    expect(mock.window.googletag).not.toBeNull();
  });

  it("preserves the existing window.googletag if it is present", () => {
    const init = adInit(initOptions);
    const original = { data: "present" };
    mock.window.googletag = original;
    init.gpt.setupAsync(init.utils);
    expect(mock.window.googletag).toBe(original);
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
    expect(mock.googletag.display).toHaveBeenCalledWith(
      "mock-code-test-suffix"
    );
  });

  it("does not error with a null slot targeting value", () => {
    const init = adInit(merge(initOptions, { data: { slotTargeting: null } }));

    init.init();
    mock.processGoogletagCommandQueue();
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
        "Ad slot mock-code-test-suffix /mockNetwork/mockAdUnit/mockSection could not be defined, probably it was already defined"
      )
    );
  });
});
