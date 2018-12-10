import { jsdom } from "jsdom";
import adInitOriginal from "../src/utils/ad-init";

export const makeAdInitMocks = (withHeaderBidding = false) => {
  const document = jsdom("<html></html>");
  const window = document.defaultView;
  window.matchMedia = jest.fn().mockImplementation(() => ({
    addListener: jest.fn()
  }));
  const pubAds = {
    addEventListener: jest.fn(),
    collapseEmptyDivs: jest.fn(),
    disableInitialLoad: jest.fn(),
    enableAsyncRendering: jest.fn(),
    enableSingleRequest: jest.fn(),
    refresh: jest.fn(),
    setTargeting: jest.fn()
  };
  const slot = {
    addService: jest.fn(),
    defineSizeMapping: jest.fn(),
    setTargeting: jest.fn()
  };
  const sizeMapping = {
    addSize: jest.fn(),
    build: jest.fn()
  };
  const googletag = {
    cmd: [],
    defineSlot: jest.fn().mockImplementation(() => slot),
    destroySlots: jest.fn(),
    display: jest.fn(),
    enableServices: jest.fn(),
    pubads: jest.fn().mockImplementation(() => pubAds),
    sizeMapping: jest.fn().mockImplementation(() => sizeMapping)
  };
  window.googletag = googletag;
  const processGoogletagCommandQueue = () => {
    window.googletag.cmd.forEach(cmd => cmd());
    window.googletag.cmd = [];
  };
  const pbjs = {
    addAdUnits: jest.fn(),
    collapseEmptyDivs: jest.fn(),
    disableInitialLoad: jest.fn(),
    enableSingleRequest: jest.fn(),
    que: [],
    removeAdUnit: jest.fn(),
    requestBids: jest.fn(),
    setConfig: jest.fn(),
    setTargetingForGPTAsync: jest.fn()
  };
  window.pbjs = pbjs;
  const apstag = {
    /* eslint-disable prefer-rest-params, no-underscore-dangle */
    _Q: [],
    addToQueue(action, d) {
      this._Q.push([action, d]);
    },
    fetchBids() {
      this.addToQueue("f", arguments);
    },
    init() {
      this.addToQueue("i", arguments);
    },
    /* eslint-enable prefer-rest-params, no-underscore-dangle */
    setDisplayBids: jest.fn(),
    targetingKeys: jest.fn().mockReturnValue([])
  };
  window.apstag = apstag;
  const slotConfig = {
    containerID: "mock-code",
    mappings: [
      {
        height: 250,
        sizes: [[1, 1]],
        width: 100
      }
    ],
    maxSizes: {
      height: 0,
      width: 0
    },
    sizes: [],
    slotName: "mock-code"
  };
  const nuk = {
    ads: withHeaderBidding
      ? {
          fetchBids: Promise.resolve(),
          loaded: Promise.resolve()
        }
      : false
  };
  window.nuk = nuk;
  const initOptions = {
    data: {
      adUnit: "mockAdUnit",
      allSlotConfigs: [
        Object.assign({}, slotConfig),
        Object.assign({}, slotConfig)
      ],
      bidInitialiser: Promise.resolve(),
      config: slotConfig,
      debug: true,
      disableAds: false,
      networkId: "mockNetwork",
      pageTargeting: {
        pageOptionName: "pageOptionValue"
      },
      prebidConfig: {
        bidders: {},
        bidderSettings: () => {},
        bucketSize: 0,
        maxBid: 0,
        minPrice: 0,
        timeout: 0
      },
      section: "mockSection",
      sizingMap: [],
      slotName: "mockCode",
      slots: [],
      slotTargeting: {
        slotOptionName: "slotOptionValue"
      }
    },
    el: document.createElement("div"),
    eventCallback: jest.fn(),
    platform: "web",
    renderComplete: jest.fn(),
    window
  };

  return {
    initOptions,
    mock: {
      document,
      googletag,
      nuk,
      processGoogletagCommandQueue,
      pubAds,
      sizeMapping,
      slot,
      slotConfig,
      window
    }
  };
};

export const adInit = (...args) => {
  const result = adInitOriginal(...args);
  jest
    .spyOn(result.utils, "loadScript")
    .mockImplementation(() => Promise.resolve());
  return result;
};
