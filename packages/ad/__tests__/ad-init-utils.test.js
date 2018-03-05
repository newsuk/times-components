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

  it.skip("Adds a script tag to the DOM head", () => {
  });

  it.skip("Resolves the promise on script element load event", () => {
  });

  it.skip("Rejects the promise on script element error event", () => {
  });

  it.skip("Errors if the same script is loaded twice", () => {
  });

  it.skip("Rejects the promise if the timeout elapses before the script loads", () => {
  });

  it.skip("Ignores load events that happen after a timeout", () => {
  });

  it.skip("Ignores error events that happen after a timeout", () => {
  });
});
