import AdManager from "./ad-manager";
import { JSDOM } from "jsdom";

describe("AdManager", () => {
  const managerOptions = {
    adUnit: "mock-ad-unit",
    networkId: "mock-network-id",
    section: "mock-section"
  };

  beforeEach(() => {
    const window = new JSDOM().window;
    global.window = window;
    global.document = window.document;
  });

  afterAll(() => {
    delete global.window;
    delete global.window;
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

  // it('init function sets the required scripts', (done) => {
  //   const adManager = AdManager(managerOptions);
  //   adManager.init(done)
  // })
});
