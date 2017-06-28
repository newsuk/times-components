import { JSDOM } from "jsdom";

describe("AdManager", () => {
  const managerOptions = {
    adUnit: "mock-ad-unit",
    networkId: "mock-network-id",
    section: "mock-section"
  };
  let AdManager;

  beforeEach(() => {
    const window = new JSDOM().window;
    global.window = window;
    global.document = window.document;
    delete require.cache[require.resolve("./gpt-manager")];
    delete require.cache[require.resolve("./pbjs-manager")];
    delete require.cache[require.resolve("./ad-manager")];
    AdManager = require("./ad-manager").default;
  });

  afterAll(() => {
    delete global.window;
    delete global.document;
    delete require.cache[require.resolve("./gpt-manager")];
    delete require.cache[require.resolve("./pbjs-manager")];
    delete require.cache[require.resolve("./ad-manager")];
  });

  it("constructor returns an AdManager instance with correct props", () => {
    const adManager = new AdManager(managerOptions);
    expect(adManager).toBeInstanceOf(AdManager);
    expect(adManager.adUnit).toBe(managerOptions.adUnit);
    expect(adManager.networkId).toBe(managerOptions.networkId);
    expect(adManager.section).toBe(managerOptions.section);
    expect(adManager.initialised).toBeFalsy();
    expect(adManager.adQueue).toHaveLength(0);
  });

  it("init function sets the required scripts", () => {
    const adManager = new AdManager(managerOptions);
    const pbjsManager = require("./pbjs-manager");
    const gptManager = require("./gpt-manager");

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
    });
  });

  it("registerAd inserts configured ad in the queue and push it to gpt on it", () => {
    const adManager = new AdManager(managerOptions);
    const pbjsManager = require("./pbjs-manager");
    const gptManager = require("./gpt-manager");
    const windowWidth = 100;
    const mockAd = {
      code: "mock-code",
      mappings: [100, 200],
      options: { foo: "bar" }
    };
    delete require.cache[require.resolve("./generate-config")];
    const generateConfig = require("./generate-config");

    generateConfig.getSlotConfig = jest
      .fn()
      .mockImplementation((section, code, width) => {
        expect(section).toEqual(adManager.section);
        expect(code).toEqual(mockAd.code);
        expect(width).toEqual(windowWidth);
        return mockAd;
      });
    adManager._pushAdToGPT = jest.fn();

    adManager.registerAd(mockAd.code, { width: windowWidth });
    expect(generateConfig.getSlotConfig).toHaveBeenCalled();
    expect(adManager.adQueue).toHaveLength(1);
    expect(adManager.adQueue[0]).toEqual(mockAd);

    pbjsManager.setConfig = cb => cb();
    gptManager.setConfig = cb => cb();
    pbjsManager.init = (adUnits, cb) => cb();
    gptManager.init = cb => cb();
    adManager.init(() => {
      expect(adManager._pushAdToGPT).toHaveBeenCalled();
    });
  });

  it("unregister one ad", () => {
    const adManager = new AdManager(managerOptions);
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
    const adManager = new AdManager(managerOptions);
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
    adManager = new AdManager(managerOptions);
    const gptManager = require("./gpt-manager").default;
    const pbjsManager = require("./pbjs-manager").default;
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

    adManager.display();
    gptManager.googletag.cmd[0]();
    pbjsManager.pbjs.que[0]();
    expect(adManager.display).not.toThrowError();
    expect(pubads).toHaveBeenCalled();
    expect(refresh).toHaveBeenCalled();
    expect(setTargetingForGPTAsync).toHaveBeenCalled();
  });

  it("pushAdToGPT gives an error if ad manager is not initialised", () => {
    adManager = new AdManager(managerOptions);
    expect(adManager.initialised).toEqual(false);
    expect(adManager._pushAdToGPT).toThrowError();
  });

  it("pushAdToGPT creates and sets slot and asks gpt to display", () => {
    adManager = new AdManager(managerOptions);
    const gptManager = require("./gpt-manager").default;

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
    const gptManager = require("./gpt-manager").default;
    adManager = new AdManager(managerOptions);

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
    const gptManager = require("./gpt-manager").default;
    adManager = new AdManager(managerOptions);
    gptManager.googletag = {
      defineSlot: jest.fn()
    };

    const slotId = "mock-slot-id";
    adManager._createSlot(slotId, managerOptions.section);
    expect(gptManager.googletag.defineSlot).toHaveBeenCalled();
  });
});
