import { makeAdInitMocks } from "../../fixtures/ad-init-mocks";
import adInit from "../../src/utils/ad-init";

export default () => {
  let mock;
  let initOptions;
  let utils;
  jest.useFakeTimers();

  beforeEach(() => {
    ({ mock, initOptions } = makeAdInitMocks());
    ({ utils } = adInit(initOptions));
  });

  it("adds a script tag to the DOM head", () => {
    utils.loadScript("my-script", 0).catch(() => {});
    const scripts = mock.window.document.head.getElementsByTagName("script");
    expect(scripts.length).toBe(1);
  });

  it("logs an error and swallows the exception if adding a script tag throws an exception", () => {
    jest
      .spyOn(mock.window.document.head, "appendChild")
      .mockImplementation(() => {
        throw new Error("lala");
      });
    utils.createScriptElement("mock-uri");
    expect(initOptions.eventCallback).toHaveBeenCalledWith(
      "log",
      'Could not insert script "mock-uri" (Error: lala) - could be caused by ad blocker'
    );
  });

  it("resolves the promise on script element load event", done => {
    jest
      .spyOn(utils, "createScriptElement")
      .mockImplementation((uri, onLoad) => {
        onLoad();
      });
    utils
      .loadScript("my-script", 0)
      .then(() => done())
      .catch(done);
  });

  it("rejects the promise on script element error event", done => {
    jest
      .spyOn(utils, "createScriptElement")
      .mockImplementation((uri, onLoad, onError) => {
        onError();
      });
    utils.loadScript("my-script", 0).catch(() => done());
  });

  it("errors if the same script is loaded twice", () => {
    const doLoadScript = () => utils.loadScript("my-script", 0).catch(() => {});
    doLoadScript();
    expect(doLoadScript).toThrow('Inserting "my-script" twice');
  });

  it("rejects the promise if the timeout elapses before the script loads", done => {
    jest.spyOn(utils, "createScriptElement").mockImplementation();
    utils.loadScript("my-script", 1000).catch(() => done());
    jest.runTimersToTime(1000);
  });
};
