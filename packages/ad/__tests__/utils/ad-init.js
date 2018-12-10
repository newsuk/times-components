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

  it("performs page-level setup for the first slot only", () => {
    const init1 = adInit(initOptions);
    const init2 = adInit(initOptions);

    jest.spyOn(init1, "initPageAsync").mockReturnValue(Promise.resolve());
    jest.spyOn(init2, "initPageAsync").mockReturnValue(Promise.resolve());

    init1.init();
    init2.init();

    expect(init1.initPageAsync).toHaveBeenCalledTimes(1);
    expect(init2.initPageAsync).toHaveBeenCalledTimes(0);
  });

  it("refresh the ads on a new breakpoint", () => {
    const init1 = adInit(initOptions);

    jest
      .spyOn(init1.gpt, "scheduleSetPageTargetingValues")
      .mockImplementation();
    jest.spyOn(init1.gpt, "displayAds").mockImplementation();

    init1.init();
    init1.handleBreakpointChange("huge", { matches: true });
    mock.processGoogletagCommandQueue();

    expect(init1.gpt.scheduleSetPageTargetingValues).toHaveBeenCalledWith({
      breakpoint: "huge",
      refresh: "true"
    });
    expect(init1.gpt.displayAds).toHaveBeenCalledTimes(1);
  });

  it("do not refresh the ads if the query doesn't match", () => {
    const init1 = adInit(initOptions);

    jest
      .spyOn(init1.gpt, "scheduleSetPageTargetingValues")
      .mockImplementation();
    jest.spyOn(init1.gpt, "displayAds").mockImplementation();

    init1.init();
    init1.handleBreakpointChange("huge", { matches: false });

    expect(init1.gpt.displayAds).toHaveBeenCalledTimes(0);
  });

  it("rejects if the init hook is called twice", () => {
    const init = adInit(initOptions);
    init.init();
    return init.init().catch(err => {
      const expectedError = new Error("init() has already been called");
      expect(err).toEqual(expectedError);
    });
  });

  it("reject if ads are disabled", () => {
    const init = adInit(merge(initOptions, { data: { disableAds: true } }));
    return init.init().catch(err => {
      const expectedError = new Error("ads disabled");
      expect(err).toEqual(expectedError);
    });
  });

  it("sets element only once", () => {
    const init = adInit(initOptions);
    jest.spyOn(init, "initElement");
    init.init();
    expect(init.initElement).toHaveBeenCalledTimes(1);
    init.init();
    expect(init.initElement).toHaveBeenCalledTimes(1);
  });
};
