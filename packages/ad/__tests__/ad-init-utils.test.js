import { jsdom } from "jsdom";

import { makeAdInitMocks } from "./ad-init-mocks";
import adInit from "../ad-init";
import { expectFunctionToBeSerialisable } from "./check-serialisable-function";

describe("Ad init", () => {
  let mock;
  let utils;
  jest.useFakeTimers();

  beforeEach(() => {
    const adInitMocks = makeAdInitMocks();
    mock = adInitMocks.mock;
    // console.log(adInit(adInitMocks.initOptions).utils);
    utils = adInit(adInitMocks.initOptions).utils;
  });

  it("Adds a script tag to the DOM head", () => {
    utils.loadScript("my-script", 0)
      .catch(() => {});
    const scripts = mock.window.document.head.getElementsByTagName("script");
    expect(scripts.length).toBe(1);
  });

  it("Resolves the promise on script element load event", done => {
    jest.spyOn(utils, "createScriptElement").mockImplementation((uri, onLoad, onError) => {
      onLoad();
    });
    utils.loadScript("my-script", 0)
      .then(() => done())
      .catch(done);
  });

  it.skip("Rejects the promise on script element error event", () => {
    jest.spyOn(utils, "createScriptElement").mockImplementation((uri, onLoad, onError) => {
      onError();
    });
    utils.loadScript("my-script", 0)
      .catch(() => done());
  });

  it("Errors if the same script is loaded twice", () => {
    const doLoadScript = () => utils.loadScript("my-script", 0).catch(() => {});
    doLoadScript();
    expect(doLoadScript).toThrow('Inserting "my-script" twice');
  });

  it("Rejects the promise if the timeout elapses before the script loads", done => {
    jest.spyOn(utils, "createScriptElement").mockImplementation();
    utils.loadScript("my-script", 1000)
      .catch(() => done());
    jest.runTimersToTime(1000);
  });
});
