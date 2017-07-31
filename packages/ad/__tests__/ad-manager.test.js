import AdManager from "../ad-manager";
import { getSlotConfig } from "../generate-config";
import gptManager from "../gpt-manager";
import pbjsManager from "../pbjs-manager";

describe("AdManager", () => {
  const managerOptions = {
    adUnit: "mock-ad-unit",
    networkId: "mock-network-id",
    section: "mock-section",
    gptManager,
    pbjsManager
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

    const width = 100;
    const code = "mock-code";

    adManager.pushAdToGPT = jest.fn();

    const slotConfig = getSlotConfig(adManager.section, code, width);
    adManager.registerAd(slotConfig);
    expect(adManager.registeredSlots).toEqual({});
    expect(adManager.adQueue).toHaveLength(1);
    expect(adManager.adQueue[0]).toEqual(slotConfig);

    newPbjsManager.setConfig = () => Promise.resolve();
    newGptManager.setConfig = () => Promise.resolve();
    newPbjsManager.init = () => Promise.resolve();
    newGptManager.init = () => Promise.resolve();
    return adManager.init().then(() => {
      expect(adManager.pushAdToGPT).toHaveBeenCalled();
      expect(adManager.adQueue).toHaveLength(0);
    });
  });

  it("unregister specifc ads", () => {
    const adToRemove = "slot-1";
    const registeredSlots = {
      "slot-1": "foo",
      "slot-2": "bar"
    };
    adManager.registeredSlots = { ...registeredSlots };
    adManager.gptManager.removeAds = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    adManager.pbjsManager.removeAdUnits = jest.fn().mockImplementation(
      // Make sure we call the removeAdUnits correctly to deregister all ads
      codes => {
        expect(codes).toEqual([adToRemove]);
        return Promise.resolve();
      }
    );

    return adManager.unregisterAds([adToRemove]).then(() => {
      expect(adManager.registeredSlots[adToRemove]).toBeUndefined();
      expect(adManager.gptManager.removeAds).toHaveBeenCalledWith([
        registeredSlots[adToRemove]
      ]);
      expect(adManager.pbjsManager.removeAdUnits).toHaveBeenCalled();
    });
  });
  //
  it("unregister does not unregister if element does not exist", () => {
    const nonExistentAd = "foo";
    const registeredSlots = {
      "slot-1": "foo",
      "slot-2": "bar"
    };
    adManager.registeredSlots = { ...registeredSlots };
    adManager.gptManager.removeAds = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    adManager.pbjsManager.removeAdUnits = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    return adManager.unregisterAds([nonExistentAd]).then(() => {
      expect(Object.keys(adManager.registeredSlots)).toHaveLength(2);
      expect(adManager.gptManager.removeAds).toHaveBeenCalled();
      expect(adManager.pbjsManager.removeAdUnits).toHaveBeenCalled();
    });
  });

  it("getAds does nothing if there are ads still registered", () => {
    adManager.init = jest.fn();
    adManager.display = jest.fn();
    adManager.registeredSlots = {
      "ad-1": "foobar"
    };
    return adManager.getAds().then(() => {
      expect(adManager.init).not.toHaveBeenCalled();
      expect(adManager.display).not.toHaveBeenCalled();
    });
  });

  it("getAds calls init and display if there are no registerAds", () => {
    adManager.init = jest.fn().mockImplementation(() => Promise.resolve());
    adManager.display = jest.fn().mockImplementation(() => Promise.resolve());
    adManager.registeredSlots = {};
    return adManager.getAds().then(() => {
      expect(adManager.init).toHaveBeenCalled();
      expect(adManager.display).toHaveBeenCalled();
    });
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

  it("pushAdToGPT creates and sets slot and asks gpt to display", () => {
    const newGptManager = adManager.gptManager;

    const addService = jest.fn();
    const defineSizeMapping = jest.fn();
    adManager.createSlot = jest.fn().mockImplementation(() => ({
      getSlotElementId: () => 1,
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
