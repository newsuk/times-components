import pbjs from "../pbjs-manager";
import { pbjs as pbjsConfig } from "../config";

describe("PrebidManager", () => {
  let pbjsManager;

  beforeEach(() => {
    pbjsManager = pbjs(pbjsConfig);
  });

  it("pbjsManager singleton is initialised with correct props", () => {
    expect(pbjsManager.scriptSet).toBeFalsy();
    expect(pbjsManager.initialised).toBeFalsy();
    expect(pbjsManager.pbjs).toBeNull();
    expect(pbjsManager.isReady).toBeFalsy();
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
    const prebid = pbjsManager.pbjs;

    expect(prebid.bidderSettings).not.toBeDefined();
    pbjsManager.setConfig();
    expect(typeof prebid.bidderTimeout).toEqual("number");
    expect(prebid.bidderSettings).toBeDefined();

    const callback = jest.fn();
    pbjsManager.setConfig(callback);
    expect(callback).toHaveBeenCalled();
  });

  it("init function adds the ad units and makes the bid requests", () => {
    const callback = jest.fn();
    const addAdUnits = jest.fn();
    const requestBids = ({ bidsBackHandler }) => bidsBackHandler();

    pbjsManager.loadScript();
    const prebid = pbjsManager.pbjs;
    prebid.requestBids = requestBids;
    prebid.addAdUnits = addAdUnits;

    pbjsManager.init({}, callback);
    expect(prebid.que).toHaveLength(1);
    prebid.que[0]();
    expect(addAdUnits).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
    expect(pbjsManager.initialised).toBeTruthy();
    expect(pbjsManager.isReady).toBeTruthy();
  });
});
