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
};
