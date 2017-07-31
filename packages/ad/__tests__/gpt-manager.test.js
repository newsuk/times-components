import gptManager from "../gpt-manager";

describe("GptManager", () => {
  beforeEach(() => {
    // Clean the command queue if there is one
    const googletag = gptManager.googletag;
    if (googletag && googletag.cmd) {
      googletag.cmd = [];
    }
  });

  it("gptManager singleton is initialised with correct props", () => {
    expect(gptManager.scriptSet).toBeFalsy();
    expect(gptManager.initialised).toBeFalsy();
    expect(gptManager.googletag).toBeNull();
    expect(gptManager.isReady).toBeFalsy();
  });

  it("loadScript function sets the required scripts", () => {
    expect(document.getElementsByTagName("script")).toHaveLength(0);
    gptManager.loadScript();
    expect(document.getElementsByTagName("script")).toHaveLength(1);
    expect(gptManager.scriptSet).toBeTruthy();
    expect(gptManager.googletag).toBeTruthy();
    expect(gptManager.googletag).toBe(window.googletag);
  });

  it("setConfig function sets the required configurations in the queue", () => {
    const enableSingleRequest = jest.fn();
    const enableAsyncRendering = jest.fn();
    const collapseEmptyDivs = jest.fn();
    const disableInitialLoad = jest.fn();

    gptManager.loadScript();
    const googletag = gptManager.googletag;
    googletag.pubads = () => ({
      enableSingleRequest,
      enableAsyncRendering,
      collapseEmptyDivs,
      disableInitialLoad
    });

    gptManager.setConfig();
    expect(googletag.cmd).toHaveLength(1);
    googletag.cmd[0]();
    expect(enableSingleRequest).toHaveBeenCalled();
    expect(enableAsyncRendering).toHaveBeenCalled();
    expect(collapseEmptyDivs).toHaveBeenCalled();
    expect(disableInitialLoad).toHaveBeenCalled();
  });

  it("init function calls enableServices and sets the initialised fields", () => {
    const enableServices = jest.fn();

    gptManager.loadScript();
    const googletag = gptManager.googletag;
    googletag.enableServices = enableServices;

    gptManager.init();
    expect(googletag.cmd).toHaveLength(1);
    googletag.cmd[0]();
    expect(enableServices).toHaveBeenCalled();
    expect(gptManager.initialised).toBeTruthy();
    expect(gptManager.isReady).toBeTruthy();
  });

  it("setConfig resolves if script was set and gpt is initialised", () => {
    const googletag = gptManager.googletag;
    googletag.cmd = jest.fn();
    gptManager.isReady = jest.fn().mockImplementation(() => true);
    gptManager.setConfig();
    expect(googletag.cmd).not.toHaveBeenCalled();
  });

  it("init resolves if script was set and gpt is initialised", () => {
    const googletag = gptManager.googletag;
    googletag.cmd = jest.fn();
    gptManager.isReady = jest.fn().mockImplementation(() => true);
    gptManager.init();
    expect(googletag.cmd).not.toHaveBeenCalled();
  });

  it("removeAds calls destroySlots with the specific slots to destroy", () => {
    const googletag = gptManager.googletag;
    googletag.destroySlots = jest.fn();
    const slots = [{ foo: "bar" }];
    const removeAds = gptManager.removeAds(slots);
    googletag.cmd[0]();
    return removeAds.then(() => {
      expect(googletag.destroySlots).toHaveBeenCalledWith(slots);
    });
  });
});
