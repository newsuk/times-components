import AdManager from "../ad-manager";
import { getSlotConfig } from "../generate-config";
import gptManager from "../gpt-manager";
import pbjs from "../pbjs-manager";
import { pbjs as pbjsConfig } from "../config";

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
    adManager = new AdManager(managerOptions);
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

  it("init function sets the required scripts", () => {
    const newPbjsManager = adManager.pbjsManager;
    const newGptManager = adManager.gptManager;

    const pbjsLoadScript = jest.fn();
    const gptLoadScript = jest.fn();

    newPbjsManager.loadScript = pbjsLoadScript;
    newGptManager.loadScript = gptLoadScript;

    newPbjsManager.setConfig = () => Promise.resolve();
    newGptManager.setConfig = () => Promise.resolve();
    newPbjsManager.init = () => Promise.resolve();
    newGptManager.init = () => Promise.resolve();
    return adManager.init().then(() => {
      expect(pbjsLoadScript).toHaveBeenCalled();
      expect(gptLoadScript).toHaveBeenCalled();
      expect(adManager.initialised).toBeTruthy();
    });
  });

  it("registerAd inserts configured ad in the queue and push it to gpt on it", () => {
    const newPbjsManager = adManager.pbjsManager;
    const newGptManager = adManager.gptManager;

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
    adManager.pushAdToGPT = jest.fn();

    adManager.registerAd(mockAd.code, { width: windowWidth });
    expect(adManager.getSlotConfig).toHaveBeenCalled();
    expect(adManager.adQueue).toHaveLength(1);
    expect(adManager.adQueue[0]).toEqual(mockAd);

    newPbjsManager.setConfig = () => Promise.resolve();
    newGptManager.setConfig = () => Promise.resolve();
    newPbjsManager.init = () => Promise.resolve();
    newGptManager.init = () => Promise.resolve();
    return adManager.init().then(() => {
      expect(adManager.pushAdToGPT).toHaveBeenCalled();
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
    const newQueue = AdManager.removeItemFromQueue(queue, itemId);
    expect(queue.length).toEqual(2);
    expect(newQueue.length).toEqual(queue.length - 1);
  });

  it("display should tell pbjs to handle targeting and gpt to refresh", () => {
    const newPbjsManager = adManager.pbjsManager;
    const newGptManager = adManager.gptManager;
    adManager.initialised = true;

    const refresh = jest.fn();
    const pubads = jest.fn().mockImplementation(() => ({
      refresh
    }));
    newGptManager.googletag = {
      cmd: [],
      pubads
    };

    const setTargetingForGPTAsync = jest.fn();
    newPbjsManager.pbjs = {
      que: [],
      setTargetingForGPTAsync
    };

    expect(() => {
      adManager.display();
    }).not.toThrowError();

    newGptManager.googletag.cmd[0]();
    newPbjsManager.pbjs.que[0]();
    expect(pubads).toHaveBeenCalled();
    expect(refresh).toHaveBeenCalled();
    expect(setTargetingForGPTAsync).toHaveBeenCalled();
  });

  it("pushAdToGPT gives an error if ad manager is not initialised", () => {
    expect(adManager.initialised).toEqual(false);
    expect(adManager.pushAdToGPT).toThrowError();
  });

  it("pushAdToGPT creates and sets slot and asks gpt to display", () => {
    const newGptManager = adManager.gptManager;

    const addService = jest.fn();
    const defineSizeMapping = jest.fn();
    adManager.createSlot = jest.fn().mockImplementation(() => ({
      addService,
      defineSizeMapping
    }));

    const display = jest.fn();
    const pubads = jest.fn();
    newGptManager.googletag = {
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
    adManager.generateSizings = jest.fn();
    adManager.pushAdToGPT(slotId, sizingMap);
    newGptManager.googletag.cmd[0]();
    expect(addService).toHaveBeenCalled();
    expect(defineSizeMapping).toHaveBeenCalled();
    expect(display).toHaveBeenCalled();
    expect(display).toHaveBeenCalledWith(slotId);
  });

  it("pushAdToGPT gives an error if slot does not exist", () => {
    adManager.createSlot = jest.fn().mockImplementation(() => null);
    const display = jest.fn();
    adManager.gptManager.googletag = {
      cmd: [],
      display
    };
    adManager.pushAdToGPT();
    adManager.gptManager.googletag.cmd[0]();
    expect(display).not.toHaveBeenCalled();
  });

  it("generateSizings calls gpt googletag to set sizings", () => {
    const newGptManager = adManager.gptManager;
    adManager.initialised = true;

    const addSize = jest.fn();
    const build = jest.fn();
    newGptManager.googletag = {
      sizeMapping: jest.fn().mockImplementation(() => ({
        addSize,
        build
      }))
    };

    const sizingMap = [
      {
        width: 300,
        height: 100,
        sizes: [[320, 50], [320, 48]]
      }
    ];

    adManager.generateSizings(sizingMap);
    expect(newGptManager.googletag.sizeMapping).toHaveBeenCalled();
    expect(addSize).toHaveBeenCalled();
    expect(build).toHaveBeenCalled();
  });

  it("createSlot calls gpt googletag to set slots", () => {
    const newGptManager = adManager.gptManager;
    adManager.initialised = true;

    newGptManager.googletag = {
      defineSlot: jest.fn()
    };

    const slotId = "mock-slot-id";
    adManager.createSlot(slotId, managerOptions.section);
    expect(newGptManager.googletag.defineSlot).toHaveBeenCalled();
  });
});
