import React from "react";

import Enzyme, { mount } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

import DOMContext from "../../src/dom-context.web";

Enzyme.configure({ adapter: new React16Adapter() });

describe("DOMContext Web", () => {
  it("passes an element to the init function", () => {
    const init = jest.fn(() => {
      return { init: () => {} };
    });
    mount(<DOMContext init={init} />);

    expect(init).toHaveBeenCalledWith(
      expect.objectContaining({
        el: expect.any(HTMLElement)
      })
    );
  });

  it("passes the data object to the init function", () => {
    const init = jest.fn(() => {
      return { init: () => {} };
    });

    mount(<DOMContext init={init} data={{ foo: "bar" }} />);

    expect(init).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { foo: "bar" }
      })
    );
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

    expect(runWithError).toThrowError("broken");
  });

  it("throw an error", () => {
    const runWithError = () => {
      mount(
        <DOMContext
          init={({ eventCallback }) => eventCallback("error", "error message")}
          data={{ foo: "bar" }}
        />
      );
    };

    expect(runWithError).toThrowError("DomContext error: error message");
  });

  it("calls the renderComplete callback when a renderComplete event is dispatched", () => {
    const onRenderComplete = jest.fn();

    mount(
      <DOMContext
        init={({ eventCallback }) => eventCallback("renderComplete")}
        onRenderComplete={onRenderComplete}
      />
    );

    expect(onRenderComplete).toHaveBeenCalled();
  });

  it("does not error when init dispatches a renderComplete event but no onRenderComplete callback is provided", () => {
    const f = () =>
      mount(
        <DOMContext
          init={({ eventCallback }) => eventCallback("renderComplete")}
        />
      );
    expect(f).not.toThrow();
  });

  it("Doesn't throw an error when given an invalid event name", () => {
    /* eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }] */
    const component = mount(
      <DOMContext
        init={() => {
          return { init: () => {} };
        }}
      />
    );

    expect(() => {
      component.instance().processEvent({ type: "invalid" });
    }).not.toThrowError();
  });
});
