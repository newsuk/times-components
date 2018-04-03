import adInitOriginal from "../ad-init";
import { makeAdInitMocks, adInit } from "./ad-init-mocks";
import { expectFunctionToBeSelfContained } from "./check-self-contained-function";

jest.useFakeTimers();

describe("AdInit", () => {
  let initOptions;
  let mock;

  beforeEach(() => {
    ({ initOptions, mock } = makeAdInitMocks());
  });

  it("is self-contained", () => {
    expectFunctionToBeSelfContained(adInitOriginal);
  });

  it("performs page-level setup for the first slot only", () => {
    const init1 = adInit(initOptions);
    const init2 = adInit(initOptions);

    jest.spyOn(init1, "doPageAdSetupAsync").mockImplementation();
    jest.spyOn(init2, "doPageAdSetupAsync").mockImplementation();

    init1.init();
    init2.init();

    expect(init1.doPageAdSetupAsync).toHaveBeenCalledTimes(1);
    expect(init2.doPageAdSetupAsync).toHaveBeenCalledTimes(0);
  });

  it("performs slot-level setup for every slot", () => {
    const init1 = adInit(initOptions);
    const init2 = adInit(initOptions);

    jest.spyOn(init1.gpt, "doSlotAdSetup").mockImplementation();
    jest.spyOn(init2.gpt, "doSlotAdSetup").mockImplementation();

    init1.init();
    init2.init();

    expect(init1.gpt.doSlotAdSetup).toHaveBeenCalledTimes(1);
    expect(init2.gpt.doSlotAdSetup).toHaveBeenCalledTimes(1);
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

  it("throws if the init hook is called twice", () => {
    const init = adInit(initOptions);
    init.init();
    expect(() => init.init()).toThrowError(
      new Error("init() has already been called")
    );
  });
});
