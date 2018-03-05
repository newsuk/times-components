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

  it.skip("TODO: loadScript tests", () => {
  });
});
