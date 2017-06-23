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
    const adManager = AdManager(managerOptions);
    expect(adManager).toBeInstanceOf(AdManager);
    expect(adManager.adUnit).toBe(managerOptions.adUnit);
    expect(adManager.networkId).toBe(managerOptions.networkId);
    expect(adManager.section).toBe(managerOptions.section);
    expect(adManager.isReady()).toBeFalsy();
    expect(adManager.adQueue).toHaveLength(0);
  });

  it("init function sets the required scripts", () => {
    const adManager = AdManager(managerOptions);
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
      expeect(adManager.isReady()).toBeTruthy();
    });
  });

  it("registerAd inserts configured ad in the queue and push it to gpt on it", () => {
    const adManager = AdManager(managerOptions);
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
});
