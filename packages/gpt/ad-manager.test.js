import { JSDOM } from "jsdom";

import AdManager from "./ad-manager";
import { getSlotConfig } from "./generate-config";
import gptManager from "./gpt-manager";
import pbjs from "./pbjs-manager";
import { pbjs as pbjsConfig } from "./config";
const pbjsManager = pbjs(pbjsConfig);

describe("AdManager", () => {
  const managerOptions = {
    adUnit: "mock-ad-unit",
    networkId: "mock-network-id",
    section: "mock-section",
    gptManager,
    pbjsManager,
    getSlotConfig
  };
  let adManager;

  beforeEach(() => {
    const window = new JSDOM().window;
    global.window = window;
    global.document = window.document;
    adManager = new AdManager(managerOptions);
  });

  afterAll(() => {
    delete global.window;
    delete global.document;
  });

  it("constructor returns an AdManager instance with correct props", () => {
    expect(adManager).toBeInstanceOf(AdManager);
    expect(adManager.initialised).toBeFalsy();
    expect(adManager.adQueue).toHaveLength(0);
  });

  it("constructor returns an AdManager instance with adUnit", () => {
    expect(adManager.adUnit).toBe(managerOptions.adUnit);
  });

  it("constructor returns an AdManager instance with networkId", () => {
    expect(adManager.networkId).toBe(managerOptions.networkId);
  });

  it("constructor returns an AdManager instance with section", () => {
    expect(adManager.section).toBe(managerOptions.section);
  });

  it("init function sets the required scripts", done => {
    const pbjsManager = adManager.pbjsManager;
    const gptManager = adManager.gptManager;

    const pbjsLoadScript = jest.fn();
    const gptLoadScript = jest.fn();

    pbjsManager.loadScript = pbjsLoadScript;
    gptManager.loadScript = gptLoadScript;

    pbjsManager.setConfig = cb => cb();
    gptManager.setConfig = cb => cb();
    pbjsManager.init = (adUnits, cb) => cb();
    gptManager.init = cb => cb();
    adManager.init(() => {
      expect(pbjsLoadScript).toHaveBeenCalled();
      expect(gptLoadScript).toHaveBeenCalled();
      expect(adManager.initialised).toBeTruthy();
      done();
    });
  });

  it("registerAd inserts configured ad in the queue and push it to gpt on it", done => {
    const pbjsManager = adManager.pbjsManager;
    const gptManager = adManager.gptManager;

    const windowWidth = 100;
    const mockAd = {
      code: "mock-code",
      mappings: [100, 200],
      options: { foo: "bar" }
    };

    adManager.getSlotConfig = jest
      .fn()
      .mockImplementation((section, code, width) => {
        expect(section).toEqual(adManager.section);
        expect(code).toEqual(mockAd.code);
        expect(width).toEqual(windowWidth);
        return mockAd;
      });
    adManager._pushAdToGPT = jest.fn();

    adManager.registerAd(mockAd.code, { width: windowWidth });
    expect(adManager.getSlotConfig).toHaveBeenCalled();
    expect(adManager.adQueue).toHaveLength(1);
    expect(adManager.adQueue[0]).toEqual(mockAd);

    pbjsManager.setConfig = cb => cb();
    gptManager.setConfig = cb => cb();
    pbjsManager.init = (adUnits, cb) => cb();
    gptManager.init = cb => cb();
    adManager.init(() => {
      expect(adManager._pushAdToGPT).toHaveBeenCalled();
      done();
    });
  });

  it("unregister one ad", () => {
    adManager.adQueue = [
      {
        id: "id-0"
      },
      {
        id: "id-1"
      }
    ];
    const itemId = "id-1";
    expect(adManager.adQueue.length).toEqual(2);
    adManager.unregisterAd(itemId);
    expect(adManager.adQueue.length).toEqual(1);
  });

  it("remove one item from the queue", () => {
    const queue = [
      {
        id: "id-0"
      },
      {
        id: "id-1"
      }
    ];
    const itemId = "id-1";
    const newQueue = adManager.removeItemFromQueue(queue, itemId);
    expect(queue.length).toEqual(2);
    expect(newQueue.length).toEqual(queue.length - 1);
  });

  it("display should tell pbjs to handle targeting and gpt to refresh", () => {
    const pbjsManager = adManager.pbjsManager;
    const gptManager = adManager.gptManager;
    adManager.initialised = true;

    const refresh = jest.fn();
    const pubads = jest.fn().mockImplementation(() => {
      return {
        refresh
      };
    });
    gptManager.googletag = {
      cmd: [],
      pubads
    };

    const setTargetingForGPTAsync = jest.fn();
    pbjsManager.pbjs = {
      que: [],
      setTargetingForGPTAsync
    };

    expect(() => {
      adManager.display();
    }).not.toThrowError();

    gptManager.googletag.cmd[0]();
    pbjsManager.pbjs.que[0]();
    expect(pubads).toHaveBeenCalled();
    expect(refresh).toHaveBeenCalled();
    expect(setTargetingForGPTAsync).toHaveBeenCalled();
  });

  it("pushAdToGPT gives an error if ad manager is not initialised", () => {
    expect(adManager.initialised).toEqual(false);
    expect(adManager._pushAdToGPT).toThrowError();
  });

  it("pushAdToGPT creates and sets slot and asks gpt to display", () => {
    const gptManager = adManager.gptManager;

    const addService = jest.fn();
    const defineSizeMapping = jest.fn();
    adManager._createSlot = jest.fn().mockImplementation(() => {
      return {
        addService,
        defineSizeMapping
      };
    });

    const display = jest.fn();
    const pubads = jest.fn();
    gptManager.googletag = {
      cmd: [],
      display,
      pubads
    };

    const slotId = "mock-slot-id";
    const sizingMap = [
      {
        width: 300,
        height: 100,
        sizes: [[320, 50], [320, 48]]
      }
    ];

    adManager.initialised = true;
    adManager._generateSizings = jest.fn();
    adManager._pushAdToGPT(slotId, sizingMap);
    gptManager.googletag.cmd[0]();
    expect(addService).toHaveBeenCalled();
    expect(defineSizeMapping).toHaveBeenCalled();
    expect(display).toHaveBeenCalled();
    expect(display).toHaveBeenCalledWith(slotId);
  });

  it("generateSizings calls gpt googletag to set sizings", () => {
    const gptManager = adManager.gptManager;
    adManager.initialised = true;

    const addSize = jest.fn();
    const build = jest.fn();
    gptManager.googletag = {
      sizeMapping: jest.fn().mockImplementation(() => {
        return {
          addSize,
          build
        };
      })
    };

    const sizingMap = [
      {
        width: 300,
        height: 100,
        sizes: [[320, 50], [320, 48]]
      }
    ];

    adManager._generateSizings(sizingMap);
    expect(gptManager.googletag.sizeMapping).toHaveBeenCalled();
    expect(addSize).toHaveBeenCalled();
    expect(build).toHaveBeenCalled();
  });

  it("createSlot calls gpt googletag to set slots", () => {
    const gptManager = adManager.gptManager;
    adManager.initialised = true;

    gptManager.googletag = {
      defineSlot: jest.fn()
    };

    const slotId = "mock-slot-id";
    adManager._createSlot(slotId, managerOptions.section);
    expect(gptManager.googletag.defineSlot).toHaveBeenCalled();
  });
});
