import { jsdom } from "jsdom";

import _makeHarness from "../dom-context-harness";

describe("DOMContext harness", () => {
  let document;
  let window;

  beforeEach(() => {
    document = jsdom("<html></html>");
    window = document.defaultView;
  });

  const fireLoadEventFor = source => {
    Array.from(document.getElementsByTagName("script"))
      .find(el => el.src === source)
      .dispatchEvent(new window.Event("load"));
  };

  const makeHarness = args =>
    _makeHarness({
      document,
      window,
      el: args.el || document.createElement("div"),
      id: "dom-context-id",
      scriptUris: [],
      data: {},
      init: () => {},
      globalNames: [],
      ...args
    });

  it("injects scripts into the document head", () => {
    const harness = makeHarness({
      scriptUris: ["a", "b"]
    });
    harness.execute();
    const scripts = document.head.getElementsByTagName("script");
    expect(scripts.length).toEqual(2);
    expect([...scripts].map(s => s.src)).toEqual(["a", "b"]);
  });

  it("does not inject script twice in document head", () => {
    const harness = makeHarness({
      scriptUris: ["a", "b"]
    });
    harness.execute();
    const anotherHarness = makeHarness({
      scriptUris: ["a", "c"]
    });
    anotherHarness.execute();
    const scripts = document.head.getElementsByTagName("script");
    expect(scripts.length).toEqual(3);
    expect([...scripts].map(s => s.src)).toEqual(["a", "b", "c"]);
  });

  it("passes global variables to the init function", () => {
    let received = null;
    window.myGlobalVariable = "myGlobalValue";

    const harness = makeHarness({
      globalNames: ["myGlobalVariable"],
      init: (el, data, g) => {
        received = g.myGlobalVariable;
      }
    });
    harness.execute();

    expect(received).toEqual("myGlobalValue");
  });

  // TODO check this in webview

  it("reports errors in the init function", () => {
    const handleError = jest.fn();
    const harness = makeHarness({
      init: () => {
        throw new Error("broken");
      },
      handleError
    });
    harness.execute();
    expect(handleError).toHaveBeenCalledWith("runInit", "broken");
  });

  it("reports errors in the execute function", () => {
    const handleError = jest.fn();
    const harness = makeHarness({
      document: null, // will cause error on DOM manipulation
      scriptUris: ["a"],
      handleError
    });
    harness.execute();
    expect(handleError).toHaveBeenCalledWith("execute", expect.any(String));
  });

  it("invokes init function after globals are loaded", () => {
    window.first = "firstValue";
    const init = jest.fn();
    const harness = makeHarness({
      init,
      scriptUris: ["providesSecond"],
      globalNames: ["first", "second"]
    });

    harness.execute();

    window.second = "secondValue";

    fireLoadEventFor("providesSecond");

    expect(init).toHaveBeenCalledTimes(1);
  });

  it("doesn't invoke init function if globals aren't loaded", () => {
    const init = jest.fn();
    const harness = makeHarness({
      init,
      scriptUris: ["willNeverLoad"],
      globalNames: ["requiredVar"]
    });

    harness.execute();
    expect(init).toHaveBeenCalledTimes(0);
  });

  it("invokes the init function immediately if all globals are provided before scripts load", () => {
    window.requiredVar = "present";
    const init = jest.fn();
    const harness = makeHarness({
      init,
      scriptUris: ["first"],
      globalNames: ["requiredVar"]
    });

    harness.execute();
    expect(init).toHaveBeenCalledTimes(1);
  });

  it("does not invoke the init function twice when multiple scripts load after globals are provided", () => {
    window.requiredVar = "present";
    const init = jest.fn();
    const harness = makeHarness({
      init,
      scriptUris: ["first"],
      globalNames: ["requiredVar"]
    });

    harness.execute();

    fireLoadEventFor("first");

    expect(init).toHaveBeenCalledTimes(1);
  });
});
