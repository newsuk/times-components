import { jsdom } from "jsdom";
import adInitOriginal from "../src/utils/ad-init";

export const makeAdInitMocks = () => {
  const document = jsdom("<html></html>");
  const window = document.defaultView;
  window.matchMedia = jest.fn().mockImplementation(() => ({
    addListener: jest.fn()
  }));
  const pubAds = {
    addEventListener: jest.fn(),
    disableInitialLoad: jest.fn(),
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
  const initOptions = {
    data: {
      adUnit: "mockAdUnit",
      config: slotConfig,
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
