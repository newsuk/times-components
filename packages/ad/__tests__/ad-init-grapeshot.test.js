import { jsdom } from "jsdom";

import { makeAdInitMocks, adInit } from "./ad-init-mocks";
import { expectFunctionToBeSerialisable } from "./check-serialisable-function";

describe("Ad init", () => {
  let mock;
  let initOptions;

  beforeEach(() => {
    const adInitMocks = makeAdInitMocks();
    mock = adInitMocks.mock;
    initOptions = adInitMocks.initOptions;
  });

  it.skip("Sets the page targeting value if the script loads", () => {
    // check that window.gs_channels is copied into gs_cat page targeting
    // by mocking gpt.scheduleSetPageTargetingValues
  });

  it.skip("Does not set page targeting value if the script errors", () => {

  });

  it.skip("Does not set page targeting value if the script times out", () => {

  });
});
