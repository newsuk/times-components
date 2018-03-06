import adInit from "../ad-init";
import { makeAdInitMocks } from "./ad-init-mocks";

describe("AdInit.grapeshot", () => {
  let mock;
  let init;

  beforeEach(() => {
    const adInitMocks = makeAdInitMocks();
    mock = adInitMocks.mock; // eslint-disable-line prefer-destructuring
    init = adInit(adInitMocks.initOptions); // eslint-disable-line prefer-destructuring
  });

  const mockGrapeshotResult = ["mock", "grapeshot", "result"];

  const testGrapeshotScriptLoadResult = createScriptElementImpl => {
    mock.window.gs_channels = mockGrapeshotResult;

    jest
      .spyOn(init.utils, "createScriptElement")
      .mockImplementation(createScriptElementImpl);
    jest.spyOn(init.gpt, "scheduleSetPageTargetingValues");

    init.grapeshot.setupAsync(init.gpt, init.utils);
  };

  it("Sets the page targeting value if the script loads", done => {
    testGrapeshotScriptLoadResult((uri, onLoad) => {
      onLoad();
      setTimeout(() => {
        expect(init.gpt.scheduleSetPageTargetingValues).toHaveBeenCalledWith({
          gs_cat: mockGrapeshotResult
        });
        done();
      }, 0);
    });
  });

  it("Does not set page targeting value if the script errors", done => {
    testGrapeshotScriptLoadResult((uri, onLoad, onError) => {
      onError();
      setTimeout(() => {
        expect(init.gpt.scheduleSetPageTargetingValues).not.toHaveBeenCalled();
        done();
      }, 0);
    });
  });
});
