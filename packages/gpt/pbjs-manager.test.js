import { JSDOM } from "jsdom";

describe("PrebidManager", () => {
  let pbjsManager;

  beforeEach(() => {
    const window = new JSDOM().window;
    global.window = window;
    global.document = window.document;
    delete require.cache[require.resolve("./pbjs-manager")];
    pbjsManager = require("./pbjs-manager").default;
  });

  afterAll(() => {
    delete global.window;
    delete global.window;
    delete require.cache[require.resolve("./pbjs-manager")];
  });

  it("pbjsManager singleton is initialised with correct props", () => {
    expect(pbjsManager.scriptSet).toBeFalsy();
    expect(pbjsManager.initialised).toBeFalsy();
    expect(pbjsManager.pbjs).toBeNull();
    expect(pbjsManager.isReady()).toBeFalsy();
  });

  it("loadScript function sets the required scripts", () => {
    expect(document.getElementsByTagName("script")).toHaveLength(0);
    pbjsManager.loadScript();
    expect(document.getElementsByTagName("script")).toHaveLength(1);
    expect(pbjsManager.scriptSet).toBeTruthy();
    expect(pbjsManager.pbjs).toBeTruthy();
    expect(pbjsManager.pbjs).toBe(window.pbjs);
  });

  it("setConfig function sets the required configurations in the pbjs object", () => {
    pbjsManager.loadScript();
    const pbjs = pbjsManager.pbjs;

    expect(pbjs.bidderSettings).not.toBeDefined();
    pbjsManager.setConfig();
    expect(typeof pbjs.bidderTimeout).toEqual("number");
    expect(pbjs.bidderSettings).toBeDefined();

    const callback = jest.fn();
    pbjsManager.setConfig(callback);
    expect(callback).toHaveBeenCalled();
  });

  it("init function adds the ad units and makes the bid requests", () => {
    const callback = jest.fn();
    const addAdUnits = jest.fn();
    const requestBids = ({ bidsBackHandler }) => bidsBackHandler();

    pbjsManager.loadScript();
    const pbjs = pbjsManager.pbjs;
    pbjs.requestBids = requestBids;
    pbjs.addAdUnits = addAdUnits;

    pbjsManager.init({}, callback);
    expect(pbjs.que).toHaveLength(1);
    pbjs.que[0]();
    expect(addAdUnits).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
    expect(pbjsManager.initialised).toBeTruthy();
    expect(pbjsManager.isReady()).toBeTruthy();
  });
});
