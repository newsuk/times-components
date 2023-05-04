import merge from "lodash.merge";
import { makeAdInitMocks, adInit } from "../../fixtures/ad-init-mocks";

export default () => {
  let mock;
  let initOptions;

  beforeEach(() => {
    ({ mock, initOptions } = makeAdInitMocks());
  });

  it("configures googletag on page init", () => {
    const init = adInit(initOptions);

    jest.spyOn(init.gpt, "setPageTargeting");

    init.init();
    expect(init.gpt.setPageTargeting).toHaveBeenCalledWith({
      pageOptionName: "pageOptionValue"
    });
  });

  it("sets the window.googletag global on page init", () => {
    const init = adInit(initOptions);
    delete mock.window.googletag;
    init.gpt.init(init.utils);
    expect(mock.window.googletag).not.toBeNull();
  });

  it("preserves the existing window.googletag if it is present", () => {
    const init = adInit(initOptions);
    const original = { data: "present" };
    mock.window.googletag = original;
    init.gpt.init(init.utils);
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
    expect(mock.googletag.display).toHaveBeenCalledWith("mock-code");
  });

  it("displays all ads for web", () => {
    const init = adInit(initOptions);

    init.gpt.refreshAd();
    mock.processGoogletagCommandQueue();

    expect(mock.pubAds.refresh).toHaveBeenCalled();
  });

  it("does not error with a null slot targeting value", () => {
    const init = adInit(merge(initOptions, { data: { slotTargeting: null } }));

    init.init();
    mock.processGoogletagCommandQueue();
  });
};
