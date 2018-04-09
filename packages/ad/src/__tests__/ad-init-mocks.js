import { jsdom } from "jsdom";

import adInitOriginal from "../ad-init";

export const makeAdInitMocks = () => {
  const document = jsdom("<html></html>");
  const window = document.defaultView;
  window.matchMedia = jest.fn().mockImplementation(() => ({
    addListener: jest.fn()
  }));
  const pubAds = {
    setTargeting: jest.fn(),
    disableInitialLoad: jest.fn(),
    enableSingleRequest: jest.fn(),
    refresh: jest.fn(),
    addEventListener: jest.fn()
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
    display: jest.fn(),
    pubads: jest.fn().mockImplementation(() => pubAds),
    defineSlot: jest.fn().mockImplementation(() => slot),
    enableServices: jest.fn(),
    sizeMapping: jest.fn().mockImplementation(() => sizeMapping)
  };
  window.googletag = googletag;
  const processGoogletagCommandQueue = () => {
    window.googletag.cmd.forEach(cmd => cmd());
    window.googletag.cmd = [];
  };
  const slotConfig = {
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
  const initOptions = {
    el: document.createElement("div"),
    data: {
      config: slotConfig,
      section: "mockSection",
      sizingMap: [],
      networkId: "mockNetwork",
      adUnit: "mockAdUnit",
      pageTargeting: {
        pageOptionName: "pageOptionValue"
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
        bidderSettings: () => {}
      },
      slots: []
    },
    window,
    renderComplete: jest.fn(),
    platform: "web",
    eventCallback: jest.fn()
  };

  return {
    mock: {
      document,
      window,
      pubAds,
      slot,
      sizeMapping,
      googletag,
      processGoogletagCommandQueue,
      slotConfig
    },
    initOptions
  };
};

export const adInit = (...args) => {
  const result = adInitOriginal(...args);
  jest
    .spyOn(result.utils, "loadScript")
    .mockImplementation(() => Promise.resolve());
  return result;
};
