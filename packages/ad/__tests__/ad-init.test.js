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
  // let platform;
  let slotConfig;

  beforeEach(() => {
    document = jsdom("<html></html>");
    window = document.defaultView;
    mockPubAds = {
      setTargeting: jest.fn(),
      disableInitialLoad: jest.fn(),
      enableSingleRequest: jest.fn(),
      refresh: jest.fn(),
      addEventListener: jest.fn()
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
    window.googletag = mockGoogletag;
    slotConfig = {
      containerID: "mock-code",
      pos: "mock-code",
      sizes: [],
      maxSizes: {
        width: 0,
        height: 0
      },
      mappings: [
        {
          width: 100,
          height: 250,
          sizes: [[1, 1]]
        }
      ]
    };
    initOptions = {
      el: document.createElement("div"),
      data: {
        config: slotConfig,
        section: "mockSection",
        sizingMap: [],
        networkId: "mockNetwork",
        adUnit: "mockAdUnit",
        pageTargeting: {
          title: "Title"
        },
        slotTargeting: {
          slotOptionName: "slotOptionValue"
        },
        pos: "mockCode",
        prebidConfig: {
          timeout: 0,
          minPrice: 0,
          maxBid: 0,
          bucketSize: 0,
          bidders: {},
          bidderSettings: {}
        }
      },
      window,
      renderComplete: jest.fn(),
      platform: "web",
      eventCallback: jest.fn()
    };
    init = adInit(initOptions);
  });

  const processGoogletagCommandQueue = () => {
    initOptions.window.googletag.cmd.forEach(cmd => cmd());
    initOptions.window.googletag.cmd = [];
  };

  it("is serialisable", () => {
    expectFunctionToBeSerialisable(adInit);
  });

  it("performs bidding and page initialisation once and initialize slot for each request for web", () => {

    const init1 = adInit(initOptions);
    const init2 = adInit(initOptions);

    jest.spyOn(init1, "doPageAdSetupAsync").mockImplementation(() => {});
    jest.spyOn(init2, "doPageAdSetupAsync").mockImplementation(() => {});
    jest.spyOn(init1.gpt, "scheduleSlotDefine").mockImplementation(() => {});
    jest.spyOn(init2.gpt, "scheduleSlotDefine").mockImplementation(() => {});

    init1.init();
    init2.init();

    expect(init1.doPageAdSetupAsync).toHaveBeenCalledTimes(1);
    expect(init2.doPageAdSetupAsync).toHaveBeenCalledTimes(0);
    expect(init1.gpt.scheduleSlotDefine).toHaveBeenCalledTimes(1);
    expect(init2.gpt.scheduleSlotDefine).toHaveBeenCalledTimes(1);
  });

  it("does not perform bidding request for native", () => {
    const nativeInitOptions = Object.assign(initOptions, {
      platform: "native"
    });
    const nativeInit = adInit(nativeInitOptions);

    nativeInit.initializeBidding = jest.fn();
    nativeInit.scheduleGPTConfiguration = jest.fn();
    nativeInit.scheduleSlotDefine = jest.fn();

    nativeInit.init();
    expect(nativeInit.initializeBidding).toHaveBeenCalledTimes(0);
    expect(nativeInit.scheduleGPTConfiguration).toHaveBeenCalledTimes(1);
    expect(nativeInit.scheduleSlotDefine).toHaveBeenCalledTimes(1);

    nativeInit.init();
    // called once in the first init call, so 1 + 0 = 1
    expect(nativeInit.scheduleGPTConfiguration).toHaveBeenCalledTimes(1);
    expect(nativeInit.scheduleSlotDefine).toHaveBeenCalledTimes(2);
  });

  it("configures googletag on page init", () => {
    init.initializeBidding = jest.fn();
    init.scheduleSlotDefine = jest.fn();

    init.init();
    processGoogletagCommandQueue();
    expect(mockPubAds.setTargeting).toHaveBeenCalledWith("title", "Title");
  });

  it("configures slots on slot init", () => {
    init.initializeBidding = jest.fn();
    init.scheduleGPTConfiguration = jest.fn();

    init.init();
    processGoogletagCommandQueue();
    expect(mockSizeMapping.addSize).toHaveBeenCalledWith([100, 250], [[1, 1]]);
    expect(mockSlot.setTargeting).toHaveBeenCalledWith(
      "slotOptionName",
      "slotOptionValue"
    );
  });

  it("displays all ads for web", () => {
    init.initializeBidding = jest.fn();

    init.init();
    processGoogletagCommandQueue();
    expect(mockGoogletag.display).toHaveBeenCalled(); // when slot is define
    expect(mockPubAds.refresh).not.toHaveBeenCalled(); // when prebid, amazon and dfp is ready

    init.applyPrebidTargeting = jest.fn();
    init.applyAmazonTargeting = jest.fn();
    init.displayAds(mockGoogletag);
    expect(init.applyPrebidTargeting).toHaveBeenCalled();
    expect(mockPubAds.refresh).toHaveBeenCalled();
  });

  it("displays all ads for native", () => {
    const nativeInitOptions = Object.assign(initOptions, {
      platform: "native"
    });
    const nativeInit = adInit(nativeInitOptions);
    jest.spyOn(nativeInit, "dfpReady");

    nativeInit.init();
    nativeInitOptions.window.googletag.cmd.forEach(cmd => cmd());
    nativeInitOptions.window.googletag.cmd = [];

    expect(nativeInitOptions.window.googletag.display).toHaveBeenCalled(); // when slot is define
    expect(nativeInit.dfpReady).toHaveBeenCalled();
  });

  it("throws if defineSlot returns null", () => {
    mockGoogletag.defineSlot.mockImplementation(() => null);

    init.initializeBidding = jest.fn();
    init.scheduleGPTConfiguration = jest.fn();

    // init.scheduleSlotDefine = jest.fn();

    init.init();
    expect(processGoogletagCommandQueue).toThrowError(
      new Error(
        "Ad slot mock-code /mockNetwork/mockAdUnit/mockSection could not be defined, probably it was already defined"
      )
    );
  });

  // it("throws if the execute hook is called twice", () => {
  //   init.execute();
  //   expect(() => init.execute()).toThrowError(
  //     new Error("execute() has already been called")
  //   );
  // });

  it("get the ad unit path", () => {
    expect(init.getAdUnitPath(["3048", "d.thetimes.co.uk"])).toEqual(
      "/3048/d.thetimes.co.uk"
    );
  });

  it("get the ad unit path with a commercial section", () => {
    expect(init.getAdUnitPath(["3048", "d.thetimes.co.uk", "news"])).toEqual(
      "/3048/d.thetimes.co.uk/news"
    );
  });

  it("get Amazon Config without a commercial section", () => {
    const adsSlot = [{ code: "ad-header", sizes: [[970, 250], [970, 90]] }];
    const amazonSlotConfig = [
      {
        slotID: "ad-header",
        slotName: "/3048/d.thetimes.co.uk",
        sizes: [[970, 250], [970, 90]]
      }
    ];
    expect(init.getAmazonConfig(adsSlot, "3048", "d.thetimes.co.uk")).toEqual(
      amazonSlotConfig
    );
  });

  it("get Amazon Config with a commercial section", () => {
    expect(
      init.getAmazonConfig([], "3048", "d.thetimes.co.uk", "news")
    ).toEqual([]);
  });

  // TODO APSTAG
  it("setup and init Amazon apstag", () => {
    /* eslint no-underscore-dangle: ["error", { "allow": ["_Q"] }] */
    expect(window.apstag).toEqual(undefined);
    init.configureApstag();
    expect(window.apstag._Q).toEqual([]);

    init.initApstag("3360", 3000);
    expect(window.apstag._Q).not.toBe([]);
  });
});
