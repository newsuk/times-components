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
  });

  it("init function adds the ad units and makes the bid requests", () => {
    const addAdUnits = jest.fn();
    const requestBids = ({ bidsBackHandler }) => bidsBackHandler();

    pbjsManager.loadScript();
    const prebid = pbjsManager.pbjs;
    prebid.requestBids = requestBids;
    prebid.addAdUnits = addAdUnits;

    pbjsManager.init({});
    expect(prebid.que).toHaveLength(1);
    prebid.que[0]();
    expect(addAdUnits).toHaveBeenCalled();
    expect(pbjsManager.initialised).toBeTruthy();
    expect(pbjsManager.isReady).toBeTruthy();
  });

  describe("bidderSettings", () => {
    let bidResponse;
    let adserverTargeting;
    beforeEach(() => {
      pbjsManager.loadScript();
      const prebid = pbjsManager.pbjs;
      pbjsManager.setConfig();
      adserverTargeting = prebid.bidderSettings.standard.adserverTargeting;

      bidResponse = {
        bidder: "appnexus",
        adId: "1712a75ae776bfb",
        size: [300, 250]
      };
    });

    it("prebid response has bidder value", () => {
      expect(adserverTargeting[0].val(bidResponse)).toEqual(bidResponse.bidder);
    });

    it("prebid response has adId value", () => {
      expect(adserverTargeting[1].val(bidResponse)).toEqual(bidResponse.adId);
    });

    it("prebid response cpm value is higher than maxBid", () => {
      bidResponse.cpm = 20;
      expect(adserverTargeting[2].val(bidResponse)).toEqual("15.00");
    });

    it("prebid response cpm value is lower than bucketSize", () => {
      bidResponse.cpm = 0;
      expect(adserverTargeting[2].val(bidResponse)).toEqual("0.01");
    });

    it("prebid response cpm value is lower than maxBid and higher than bucketSize", () => {
      bidResponse.cpm = 10;
      expect(adserverTargeting[2].val(bidResponse)).toEqual("10.00");
    });

    it("prebid response has size value", () => {
      expect(adserverTargeting[3].val(bidResponse)).toEqual(bidResponse.size);
    });
  });
});
