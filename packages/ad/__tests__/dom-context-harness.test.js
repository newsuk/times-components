import { jsdom } from "jsdom";

import _makeHarness from "../dom-context-harness";
import { expectFunctionToBeSerialisable } from "./check-serialisable-function";

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

  it("is serialisable", () => {
    expectFunctionToBeSerialisable(_makeHarness);
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

  it("will invoke the execute hook returned by the init function", () => {
    window.myGlobalVariable = "myGlobalValue";
    const execute = jest.fn();
    const init = jest.fn().mockImplementation(() => ({ execute }));

    const harness = makeHarness({ init });
    harness.execute();

    expect(execute).toHaveBeenCalled();
  });

  it("passes global variables to the init function", () => {
    window.myGlobalVariable = "myGlobalValue";
    const init = jest.fn();

    const harness = makeHarness({
      globalNames: ["myGlobalVariable"],
      init
    });
    harness.execute();

    expect(init).toHaveBeenCalledWith(
      expect.objectContaining({
        globals: { myGlobalVariable: "myGlobalValue" }
      })
    );
  });

  it("reports errors in the init function", () => {
    jest.spyOn(console, "error").mockImplementation();
    const eventCallback = jest.fn();
    const harness = makeHarness({
      init: () => {
        throw new Error("broken");
      },
      eventCallback
    });
    harness.execute();
    expect(eventCallback).toHaveBeenCalledWith("error", "broken");
  });

  it("reports errors in the execute function", () => {
    const eventCallback = jest.fn();
    const harness = makeHarness({
      document: null, // will cause error on DOM manipulation
      scriptUris: ["a"],
      eventCallback
    });
    harness.execute();
    expect(eventCallback).toHaveBeenCalledWith("error", expect.any(String));
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

  it("Dispatches a renderComplete event when the renderComplete callback is invoked", () => {
    const eventCallback = jest.fn();

    const harness = makeHarness({
      init: ({ renderComplete }) => renderComplete(),
      eventCallback
    });

    harness.execute();

    expect(eventCallback).toHaveBeenCalledWith("renderComplete");
  });

  it("Does not dispatch multiple renderComplete events when the renderComplete callback is invoked multiple times", () => {
    const eventCallback = jest.fn();

    const harness = makeHarness({
      init: ({ renderComplete }) => {
        renderComplete();
        renderComplete();
      },
      eventCallback
    });

    harness.execute();

    expect(eventCallback).toHaveBeenCalledTimes(1);
  });

  it("Allows the renderComplete callback to be invoked asychronously", done => {
    const harness = makeHarness({
      init: ({ renderComplete }) => setTimeout(renderComplete, 0),
      eventCallback: event => {
        expect(event).toEqual("renderComplete");
        done();
      }
    });

    harness.execute();
  });
});
