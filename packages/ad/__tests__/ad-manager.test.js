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
    adConfig: {
      id: "123",
      title: "title",
      label: "label",
      commercialtags: "commtag",
      contentType: "art"
    },
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

  it("init function sets the page level config", () => {
    window.nuk = {
      ads: {
        editionDate: "2018-01-28",
        editionId: "ef4456ea-efe3-11e7-ad6b-d6f772a113e5"
      },
      user: {
        isLoggedIn: true,
        isMeteredExpired: false
      }
    };

    document.cookie =
      "utag_main=v_id:015d647f7c96001850021819e00c05079001b07100c48$_sn:296$_ss:0$_st:1517142909493$_pn:2;exp-session$ses_id:1517141094606;exp-session$_prevpage:article:ex-cabinet ministers ride brexit gravy train::current edition::article;exp-1517144698707";
    document.cookie =
      "acs_tnl=tid%3D7e8221f5-bd07-4e41-aac1-0976385d0ecb%26eid%3DAAAA002920174%26e%3D1%26a%3DTmVoYSBTcml2YXN0YXZh%26u%3D1910c402-2cf6-40dd-bb1e-4ee24e1e7f6b%26t%3D1513095931%26h%3D39b9e97b7885a332482fdeafb472855d; ";

    const pageConfig = AdManager.setPageLevelConfig(managerOptions.adConfig);

    const pageConfigExpected = {
      edition_id: "2018-01-28",
      e_uuid: "ef4456ea-efe3-11e7-ad6b-d6f772a113e5",
      search: "null",
      share_token: "null",
      shared: "0",
      cont: "art",
      aid: "123",
      kw: ["title", "label", "commtag"],
      pw: "1",
      teaser: false,
      log: "1",
      subscriber: "1",
      kuid: undefined,
      ksg: undefined,
      ppid: "AAAA002920174",
      eid: "AAAA002920174",
      om_v_id: "015d647f7c96001850021819e00c05079001b07100c48",
      cips: "null",
      refresh: "false"
    };
    expect(pageConfig).toEqual(pageConfigExpected);
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
    expect(adManager.adQueue).toHaveLength(1);
    expect(adManager.adQueue[0]).toEqual(slotConfig);

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

  it("unregister does not unregister if element does not exist", () => {
    adManager.adQueue = [
      {
        id: "id-0"
      },
      {
        id: "id-1"
      }
    ];
    const itemId = "id-2";
    expect(adManager.adQueue.length).toEqual(2);
    adManager.unregisterAd(itemId);
    expect(adManager.adQueue.length).toEqual(2);
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
