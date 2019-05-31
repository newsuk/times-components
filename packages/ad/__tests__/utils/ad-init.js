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

  it("rejects if the init hook is called twice", () => {
    const init = adInit(initOptions);
    init.init();
    return init.init().then(err => {
      expect(err).toEqual("skipped");
    });
  });

  it("reject if ads are disabled", () => {
    const init = adInit(merge(initOptions, { data: { disableAds: true } }));
    return init.init().then(err => {
      expect(err).toEqual("skipped");
    });
  });
};
