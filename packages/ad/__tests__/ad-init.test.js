import { jsdom } from "jsdom";

import adInit from "../ad-init";
import { expectFunctionToBeSerialisable } from "./check-serialisable-function";

jest.useFakeTimers();

describe("Ad init", () => {
  let document;
  let window;
  let initOptions;
  let init;
  let mockPubAds;
  let mockSlot;
  let mockSizeMapping;
  let mockGoogletag;

  beforeEach(() => {
    document = jsdom("<html></html>");
    window = document.defaultView;
    mockPubAds = {
      setTargeting: jest.fn(),
      disableInitialLoad: jest.fn(),
      enableSingleRequest: jest.fn(),
      refresh: jest.fn()
    };
    mockSlot = {
      addService: jest.fn(),
      defineSizeMapping: jest.fn(),
      setTargeting: jest.fn()
    };
    mockSizeMapping = {
      addSize: jest.fn(),
      build: jest.fn()
    };
    mockGoogletag = {
      cmd: [],
      display: jest.fn(),
      pubads: jest.fn().mockImplementation(() => mockPubAds),
      defineSlot: jest.fn().mockImplementation(() => mockSlot),
      enableServices: jest.fn(),
      sizeMapping: jest.fn().mockImplementation(() => mockSizeMapping)
    };
    initOptions = {
      el: document.createElement("div"),
      data: {
        config: {},
        sizingMap: [],
        networkId: "mockNetwork",
        adUnit: "mockAdUnit",
        pageTargeting: {
          title: "Title"
        },
        code: "mockCode",
        pos: "mockPos"
      },
      window,
      globals: {
        googletag: mockGoogletag
      },
      renderComplete: jest.fn()
    };
    init = adInit(initOptions);
  });

  const processGoogletagCommandQueue = () => {
    initOptions.globals.googletag.cmd.forEach(cmd => cmd());
    initOptions.globals.googletag.cmd = [];
  };

  it("is serialisable", () => {
    expectFunctionToBeSerialisable(adInit);
  });

  it("performs page and slot initialisation if it is the first initialiser to be called", () => {
    jest.spyOn(init, "pageInit");
    jest.spyOn(init, "slotInit");
    init.execute();
    expect(init.pageInit).toHaveBeenCalledTimes(1);
    expect(init.slotInit).toHaveBeenCalledTimes(1);
  });

  it("does slot but not page initialisation if it is not the first initialiser to be called", () => {
    adInit(initOptions).execute();
    jest.spyOn(init, "pageInit");
    jest.spyOn(init, "slotInit");
    init.execute();
    expect(init.pageInit).toHaveBeenCalledTimes(0);
    expect(init.slotInit).toHaveBeenCalledTimes(1);
  });

  it("throws if execute is called twice", () => {
    init.execute();
    expect(() => init.execute()).toThrowError(
      new Error("execute() has already been called")
    );
  });

  it("configures googletag on page init", () => {
    init = adInit(initOptions);
    init.pageInit();
    processGoogletagCommandQueue();
    expect(mockPubAds.setTargeting).toHaveBeenCalledWith("title", "Title");
  });

  it("configures slots on slot init", () => {
    initOptions.data = {
      config: {
        code: "mock-code",
        sizes: [],
        maxSizes: {
          width: 0,
          height: 0
        }
      },
      sizingMap: [
        {
          width: 100,
          height: 250,
          sizes: [[1, 1]]
        }
      ],
      slotOptions: {
        slotOptionName: "slotOptionValue"
      }
    };
    init = adInit(initOptions);
    init.slotInit();
    processGoogletagCommandQueue();
    expect(mockSizeMapping.addSize).toHaveBeenCalledWith([100, 250], [[1, 1]]);
    expect(mockSlot.setTargeting).toHaveBeenCalledWith(
      "slotOptionName",
      "slotOptionValue"
    );
  });

  it("displays all ads after a delay", () => {
    init.execute();
    processGoogletagCommandQueue();
    expect(mockGoogletag.display).not.toHaveBeenCalled();
    expect(mockPubAds.refresh).not.toHaveBeenCalled();
    jest.runAllTimers();
    processGoogletagCommandQueue();
    expect(mockPubAds.refresh).toHaveBeenCalled();
    expect(mockGoogletag.display).toHaveBeenCalled();
  });

  it("throws if defineSlot returns null", () => {
    mockGoogletag.defineSlot.mockImplementation(() => null);
    init.slotInit();
    expect(processGoogletagCommandQueue).toThrowError(
      new Error(
        "Ad slot /mockNetwork/mockAdUnit/mockCode could not be defined, probably it was already defined"
      )
    );
  });

  it("throws if the execute hook is called twice", () => {
    init.execute();
    expect(() => init.execute()).toThrowError(
      new Error("execute() has already been called")
    );
  });
});
