import React from "react";

import Enzyme, { mount } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

import DOMContext from "../dom-context.web";

Enzyme.configure({ adapter: new React16Adapter() });

describe("DOMContext Web", () => {
  let platform;

  beforeEach(() => {
    platform: "web";
  });

  it("passes an element to the init function", () => {
    const init = jest.fn(() =>  {return {init: ()=> {}}});
    mount(<DOMContext init={init} platform={platform}/>);

    expect(init).toHaveBeenCalledWith(
      expect.objectContaining({
        el: expect.any(HTMLElement)
      })
    );
  });

  it("passes the data object to the init function", () => {
    const init = jest.fn(() =>  {return {init: ()=> {}}});

    mount(<DOMContext init={init} data={{ foo: "bar" }} platform={platform}/>);

    expect(init).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { foo: "bar" }
      })
    );
  });

  //----------- NOT PASSING GLOBALS ANYMORE -------------

  // it("passes selected global variables to the init function", () => {
  //   const init = jest.fn(() =>  {return {init: ()=> {}}});
  //   window.myGlobalVar1 = "myGlobalVar1Value";
  //   window.myGlobalVar2 = "myGlobalVar2Value";
  //   window.myGlobalVar3 = "myGlobalVar3Value";

  //   mount(
  //     <DOMContext init={init} globalNames={["myGlobalVar1", "myGlobalVar2"]} platform={platform}/>
  //   );

  //   expect(init).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       globals: {
  //         myGlobalVar1: "myGlobalVar1Value",
  //         myGlobalVar2: "myGlobalVar2Value"
  //       }
  //     })
  //   );

  //   delete window.myGlobalVar1;
  //   delete window.myGlobalVar2;
  //   delete window.myGlobalVar3;
  // });

  it("reports an error in the init function", () => {
    jest.spyOn(console, "error").mockImplementation();

    const runWithError = () => {
      mount(
        <DOMContext
          init={() => {
            throw new Error("broken");
          }}
          data={{ foo: "bar" }}
          platform={platform}
        />
      );
    };

    expect(runWithError).toThrowError("DomContext error: broken");
  });

  //  --------- FIX ME
  // it("calls onRenderComplete when the renderComplete callback is invoked", () => {
  //   const onRenderComplete = jest.fn();

  //   mount(
  //     <DOMContext
  //       init={
  //         ({ renderComplete }) => renderComplete()
  //         }
  //       onRenderComplete={onRenderComplete}
  //       platform={platform}
  //     />
  //   );

  //   expect(onRenderComplete).toHaveBeenCalled();
  // });

  //  --------- FIX ME
  // it("does not error when init calls renderComplete but no onRenderComplete callback is provided", () => {
  //   const f = () => {
  //     mount(<DOMContext init={({ renderComplete }) => renderComplete()} platform={platform}/>);
  //   };
  //   expect(f).not.toThrow();
  // });

  it("Doesn't throw an error when given an invalid event name", () => {
    const component = mount(<DOMContext init={() => {return {init: ()=> {}}}} platform={platform}/>);

    expect(() => {
      component.instance().processEvent({ type: "invalid" });
    }).not.toThrowError();
  });
});
