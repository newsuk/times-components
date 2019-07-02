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
    const initFirstRun = adInit(initOptions);

    initFirstRun.handleBreakPointChange("huge", { matches: true });
    mock.processGoogletagCommandQueue();
    mock.processGoogletagCommandQueue();

    expect(mock.pubAds.setTargeting).toHaveBeenCalledTimes(2);
    expect(mock.pubAds.setTargeting).toHaveBeenCalledWith("breakpoint", "huge");
    expect(mock.pubAds.setTargeting).toHaveBeenCalledWith("refresh", "true");
    expect(mock.pubAds.refresh).toHaveBeenCalledTimes(1);
  });

  it("do not refresh the ads if the query doesn't match", () => {
    const initFirstRun = adInit(initOptions);

    jest.spyOn(initFirstRun.gpt, "refreshAd").mockImplementation();

    initFirstRun.handleBreakPointChange("huge", { matches: false });
    mock.processGoogletagCommandQueue();
    mock.processGoogletagCommandQueue();

    expect(mock.pubAds.setTargeting).toHaveBeenCalledTimes(0);
    expect(mock.pubAds.refresh).toHaveBeenCalledTimes(0);
  });

  it("calls all the vender functions when initially executed", () => {
    const initFirstRun = adInit(initOptions);

    jest
      .spyOn(initFirstRun.apstag, "process")
      .mockReturnValueOnce(Promise.resolve());
    jest
      .spyOn(initFirstRun.prebid, "process")
      .mockReturnValueOnce(Promise.resolve());
    jest
      .spyOn(initFirstRun.gpt, "process")
      .mockReturnValueOnce(Promise.resolve());
    jest.spyOn(initFirstRun.gpt, "bid").mockReturnValueOnce(Promise.resolve());

    initFirstRun.init();

    expect(initFirstRun.prebid.process).toHaveBeenCalledTimes(1);
    expect(initFirstRun.apstag.process).toHaveBeenCalledTimes(1);
    expect(initFirstRun.gpt.process).toHaveBeenCalledTimes(1);
    expect(initFirstRun.gpt.bid).toHaveBeenCalledTimes(1);
  });

  it("calls all the vender functions only once even when its initialised multiple times", () => {
    const initFirstRun = adInit(initOptions);

    jest
      .spyOn(initFirstRun.apstag, "process")
      .mockReturnValueOnce(Promise.resolve());
    jest
      .spyOn(initFirstRun.prebid, "process")
      .mockReturnValueOnce(Promise.resolve());
    jest
      .spyOn(initFirstRun.gpt, "process")
      .mockReturnValueOnce(Promise.resolve());
    jest.spyOn(initFirstRun.gpt, "bid").mockReturnValue(Promise.resolve());

    initFirstRun.init();
    initFirstRun.init();

    expect(initFirstRun.prebid.process).toHaveBeenCalledTimes(1);
    expect(initFirstRun.apstag.process).toHaveBeenCalledTimes(1);
    expect(initFirstRun.gpt.process).toHaveBeenCalledTimes(1);
    expect(initFirstRun.gpt.bid).toHaveBeenCalledTimes(1);
  });

  it("calls all the vender process functions only once but call gpt bid functions multiple times", () => {
    const initFirstRun = adInit(initOptions);

    jest
      .spyOn(initFirstRun.apstag, "process")
      .mockReturnValueOnce(Promise.resolve());
    jest
      .spyOn(initFirstRun.prebid, "process")
      .mockReturnValueOnce(Promise.resolve());
    jest
      .spyOn(initFirstRun.gpt, "process")
      .mockReturnValueOnce(Promise.resolve());
    jest.spyOn(initFirstRun.gpt, "bid").mockReturnValueOnce(Promise.resolve());

    initFirstRun.init();

    expect(initFirstRun.prebid.process).toHaveBeenCalledTimes(1);
    expect(initFirstRun.apstag.process).toHaveBeenCalledTimes(1);
    expect(initFirstRun.gpt.process).toHaveBeenCalledTimes(1);
    expect(initFirstRun.gpt.bid).toHaveBeenCalledTimes(1);

    const initSecondRun = adInit(
      merge(initOptions, {
        window: {
          initCalled: true
        }
      })
    );

    jest
      .spyOn(initSecondRun.apstag, "process")
      .mockReturnValueOnce(Promise.resolve());
    jest
      .spyOn(initSecondRun.prebid, "process")
      .mockReturnValueOnce(Promise.resolve());
    jest
      .spyOn(initSecondRun.gpt, "process")
      .mockReturnValueOnce(Promise.resolve());
    jest.spyOn(initSecondRun.gpt, "bid").mockReturnValueOnce(Promise.resolve());

    initSecondRun.init();

    expect(initSecondRun.prebid.process).not.toHaveBeenCalled();
    expect(initSecondRun.apstag.process).not.toHaveBeenCalled();
    expect(initSecondRun.gpt.process).not.toHaveBeenCalled();
    expect(initSecondRun.gpt.bid).toHaveBeenCalledTimes(1);
  });

  it("reject if ads are disabled", () => {
    const init = adInit(merge(initOptions, { data: { disableAds: true } }));
    return init.init().then(err => {
      expect(err).toEqual("ads disabled");
    });
  });
};
