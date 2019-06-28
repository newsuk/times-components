import merge from "lodash.merge";
import adInitOriginal from "../../src/utils/ad-init";
import { makeAdInitMocks, adInit } from "../../fixtures/ad-init-mocks";
import { expectFunctionToBeSelfContained } from "../../fixtures/check-self-contained-function";

jest.useFakeTimers();

export default () => {
  let initOptions;
  let mock;

  beforeEach(() => {
    ({ initOptions, mock } = makeAdInitMocks());
  });

  it("should be self-contained", () => {
    expectFunctionToBeSelfContained(adInitOriginal);
  });

  it("refresh the ads on a new breakpoint", () => {
    const init1 = adInit(initOptions);

    init1.handleBreakPointChange("huge", { matches: true });
    mock.processGoogletagCommandQueue();
    mock.processGoogletagCommandQueue();

    expect(mock.pubAds.setTargeting).toHaveBeenCalledTimes(2);
    expect(mock.pubAds.setTargeting).toHaveBeenCalledWith("breakpoint", "huge");
    expect(mock.pubAds.setTargeting).toHaveBeenCalledWith("refresh", "true");
    expect(mock.pubAds.refresh).toHaveBeenCalledTimes(1);
  });

  it("do not refresh the ads if the query doesn't match", () => {
    const init1 = adInit(initOptions);

    jest.spyOn(init1.gpt, "refreshAd").mockImplementation();

    init1.handleBreakPointChange("huge", { matches: false });
    mock.processGoogletagCommandQueue();
    mock.processGoogletagCommandQueue();

    expect(mock.pubAds.setTargeting).toHaveBeenCalledTimes(0);
    expect(mock.pubAds.refresh).toHaveBeenCalledTimes(0);
  });

  it("calls all the vender functions when initially executed", () => {
    const init1 = adInit(initOptions);

    jest.spyOn(init1.apstag, "process").mockReturnValueOnce(Promise.resolve());
    jest.spyOn(init1.prebid, "process").mockReturnValueOnce(Promise.resolve());
    jest.spyOn(init1.gpt, "process").mockReturnValueOnce(Promise.resolve());
    jest.spyOn(init1.gpt, "bid").mockReturnValueOnce(Promise.resolve());

    init1.init();

    expect(init1.prebid.process).toHaveBeenCalledTimes(1);
    expect(init1.apstag.process).toHaveBeenCalledTimes(1);
    expect(init1.gpt.process).toHaveBeenCalledTimes(1);
    expect(init1.gpt.bid).toHaveBeenCalledTimes(1);
  });

  it("calls all the vender functions only once when initialised multiple times", () => {
    const init1 = adInit(initOptions);

    jest.spyOn(init1.apstag, "process").mockReturnValueOnce(Promise.resolve());
    jest.spyOn(init1.prebid, "process").mockReturnValueOnce(Promise.resolve());
    jest.spyOn(init1.gpt, "process").mockReturnValueOnce(Promise.resolve());
    jest.spyOn(init1.gpt, "bid").mockReturnValue(Promise.resolve());

    init1.init();
    init1.init();

    expect(init1.prebid.process).toHaveBeenCalledTimes(1);
    expect(init1.apstag.process).toHaveBeenCalledTimes(1);
    expect(init1.gpt.process).toHaveBeenCalledTimes(1);
    expect(init1.gpt.bid).toHaveBeenCalledTimes(1);
  });

  it("calls all the vender functions only once when initialised multiple times", () => {
    const init1 = adInit(initOptions);

    jest.spyOn(init1.apstag, "process").mockReturnValueOnce(Promise.resolve());
    jest.spyOn(init1.prebid, "process").mockReturnValueOnce(Promise.resolve());
    jest.spyOn(init1.gpt, "process").mockReturnValueOnce(Promise.resolve());
    jest.spyOn(init1.gpt, "bid").mockReturnValue(Promise.resolve());

    init1.init();

    expect(init1.prebid.process).toHaveBeenCalledTimes(1);
    expect(init1.apstag.process).toHaveBeenCalledTimes(1);
    expect(init1.gpt.process).toHaveBeenCalledTimes(1);
    expect(init1.gpt.bid).toHaveBeenCalledTimes(1);

    const init2 = adInit(
      merge(initOptions, {
        window: {
          initCalled: true
        }
      })
    );

    jest.spyOn(init2.apstag, "process").mockReturnValueOnce(Promise.resolve());
    jest.spyOn(init2.prebid, "process").mockReturnValueOnce(Promise.resolve());
    jest.spyOn(init2.gpt, "process").mockReturnValueOnce(Promise.resolve());
    jest.spyOn(init2.gpt, "bid").mockReturnValue(Promise.resolve());

    init2.init();

    expect(init2.prebid.process).not.toHaveBeenCalled();
    expect(init2.apstag.process).not.toHaveBeenCalled();
    expect(init2.gpt.process).not.toHaveBeenCalled();
    expect(init2.gpt.bid).toHaveBeenCalledTimes(1);
  });

  it("reject if ads are disabled", () => {
    const init = adInit(merge(initOptions, { data: { disableAds: true } }));
    return init.init().then(err => {
      expect(err).toEqual("ads disabled");
    });
  });
};
