import React from "react";
import { mount, shallow } from "enzyme";
import DOMContext from "../../src/dom-context.web";

describe("DOMContext Web", () => {
  const props = {
    height: 200,
    width: 200
  };

  it("passes an element to the init function", () => {
    const init = jest.fn(() => {
      return { init: () => {} };
    });
    mount(<DOMContext {...props} init={init} />);

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

    mount(<DOMContext {...props} data={{ foo: "bar" }} init={init} />);

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
          {...props}
          data={{ foo: "bar" }}
          init={() => {
            throw new Error("broken");
          }}
        />
      );
    };

    expect(runWithError).toThrowError("broken");
  });

  it("throw an error", () => {
    const runWithError = () => {
      mount(
        <DOMContext
          {...props}
          data={{ foo: "bar" }}
          init={({ eventCallback }) => eventCallback("error", "error message")}
        />
      );
    };

    expect(runWithError).toThrowError("DomContext error: error message");
  });

  it("calls the renderComplete callback when a renderComplete event is dispatched", () => {
    const onRenderComplete = jest.fn();

    mount(
      <DOMContext
        {...props}
        init={({ eventCallback }) => eventCallback("renderComplete")}
        onRenderComplete={onRenderComplete}
      />
    );

    expect(onRenderComplete).toHaveBeenCalled();
  });

  it("calls the renderError callback when a scriptLoadingError event is dispatched", () => {
    const onRenderErrorMock = jest.fn();

    mount(
      <DOMContext
        {...props}
        init={({ eventCallback }) => eventCallback("scriptLoadingError")}
        onRenderError={onRenderErrorMock}
      />
    );

    expect(onRenderErrorMock).toHaveBeenCalled();
  });

  it("does not error when init dispatches a renderComplete event but no onRenderComplete callback is provided", () => {
    const f = () =>
      mount(
        <DOMContext
          {...props}
          init={({ eventCallback }) => eventCallback("renderComplete")}
        />
      );
    expect(f).not.toThrow();
  });

  it("Doesn't throw an error when given an invalid event name", () => {
    /* eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }] */
    const component = mount(
      <DOMContext
        {...props}
        init={() => {
          return { init: () => {} };
        }}
      />
    );

    expect(() => {
      component.instance().processEvent({ type: "invalid" });
    }).not.toThrowError();
  });

  it("should destroy all ad slots when unmounting", () => {
    const mockDestroySlots = jest.fn();
    const mockInit = jest.fn();
    mockInit.mockReturnValue({
      init: () => {},
      destroySlots: mockDestroySlots
    });

    const wrapper = shallow(
      <DOMContext {...props} data={{}} init={mockInit} />
    );

    wrapper.unmount();

    expect(mockDestroySlots).toHaveBeenCalled();
  });
});
