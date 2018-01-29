import React from "react";

import Enzyme, { mount } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

import DOMContext from "../dom-context.web";

Enzyme.configure({ adapter: new React16Adapter() });

describe("DOMContext", () => {
  it("sets the id of the element from the props passed in", () => {
    let passedId = null;

    mount(
      <DOMContext
        id="my-id"
        init={el => {
          passedId = el.id;
        }}
      />
    );

    expect(passedId).toEqual("my-id");
  });

  it("passes the data object to the init function", () => {
    let passedData = null;

    mount(
      <DOMContext
        init={(el, data) => {
          passedData = data;
        }}
        data={{ foo: "bar" }}
      />
    );

    expect(passedData).toEqual({ foo: "bar" });
  });

  it("passes selected global variables to the init function", () => {
    let passedGlobals = null;

    window.myGlobalVar1 = "myGlobalVar1Value";
    window.myGlobalVar2 = "myGlobalVar2Value";
    window.myGlobalVar3 = "myGlobalVar3Value";

    const component = new DOMContext({
      window,
      document,
      globalNames: ["myGlobalVar1", "myGlobalVar2"],
      scriptUris: [],
      data: {},
      init: (el, data, g) => {
        passedGlobals = g;
      }
    });

    const el = document.createElement("div");
    component.handleDivRef(el);

    expect(passedGlobals).toEqual({
      myGlobalVar1: "myGlobalVar1Value",
      myGlobalVar2: "myGlobalVar2Value"
    });
  });

  it("reports an error in the init function", () => {
    jest.spyOn(console, "error").mockImplementation();

    const runWithError = () => {
      mount(
        <DOMContext
          init={() => {
            throw new Error("broken");
          }}
          data={{ foo: "bar" }}
        />
      );
    };

    expect(runWithError).toThrowError(
      "Error in runInit inside DomContext: broken"
    );
  });
});
