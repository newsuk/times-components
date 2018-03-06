import adInitOriginal from "../ad-init";
import { makeAdInitMocks, adInit } from "./ad-init-mocks";
import { expectFunctionToBeSerialisable } from "./check-serialisable-function";

jest.useFakeTimers();

describe("AdInit", () => {
  let initOptions;

  beforeEach(() => {
    initOptions = makeAdInitMocks().initOptions; // eslint-disable-line prefer-destructuring
  });

  it("is serialisable", () => {
    expectFunctionToBeSerialisable(adInitOriginal);
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
    expect(init1.gpt.doSlotAdSetup).toHaveBeenCalledTimes(1);
    expect(init2.gpt.doSlotAdSetup).toHaveBeenCalledTimes(1);
  });

  it("throws if the init hook is called twice", () => {
    const init = adInit(initOptions);
    init.init();
    expect(() => init.init()).toThrowError(
      new Error("init() has already been called")
    );
  });
});
