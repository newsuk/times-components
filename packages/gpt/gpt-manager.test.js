import { JSDOM } from "jsdom";

describe("GptManager", () => {
  let gptManager;

  beforeEach(() => {
    const window = new JSDOM().window;
    global.window = window;
    global.document = window.document;
    delete require.cache[require.resolve("./gpt-manager")];
    gptManager = require("./gpt-manager").default;
  });

  afterAll(() => {
    delete global.window;
    delete global.window;
    delete require.cache[require.resolve("./gpt-manager")];
  });

  it("gptManager singleton is initialised with correct props", () => {
    expect(gptManager.scriptSet).toBeFalsy();
    expect(gptManager.initialised).toBeFalsy();
    expect(gptManager.googletag).toBeNull();
    expect(gptManager.isReady()).toBeFalsy();
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
    const callback = jest.fn();

    gptManager.loadScript();
    const googletag = gptManager.googletag;
    googletag.pubads = () => ({
      enableSingleRequest,
      enableAsyncRendering,
      collapseEmptyDivs,
      disableInitialLoad
    });
    gptManager.setConfig(callback);
    expect(googletag.cmd).toHaveLength(1);

    googletag.cmd[0]();
    expect(enableSingleRequest).toHaveBeenCalled();
    expect(enableAsyncRendering).toHaveBeenCalled();
    expect(collapseEmptyDivs).toHaveBeenCalled();
    expect(disableInitialLoad).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  it("init function calls enableServices and sets the initialised fields", () => {
    const enableServices = jest.fn();
    const callback = jest.fn();

    gptManager.loadScript();
    const googletag = gptManager.googletag;
    googletag.enableServices = enableServices;
    gptManager.init(callback);
    expect(googletag.cmd).toHaveLength(2);

    googletag.cmd[1]();
    expect(enableServices).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
    expect(gptManager.initialised).toBeTruthy();
    expect(gptManager.isReady()).toBeTruthy();
  });
});
