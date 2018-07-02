import React from "react";
import { mount, shallow } from "enzyme";
import adInit from "../../src/utils/ad-init";
import DOMContext from "../../src/dom-context.web";

const mockInit = jest.fn();
const mockDestroySlots = jest.fn();
jest.mock("../../src/utils/ad-init", () => {
  return jest.fn().mockImplementation(() => {
    return {
      init: mockInit,
      destroySlots: mockDestroySlots
    };
  });
});

describe.only("DOMContext Web", () => {
  beforeEach(() => {
    adInit.mockClear();
  });

  const props = {
    height: 200,
    width: 200
  };

  it("calls init", () => {
    mount(<DOMContext {...props} />);

    expect(mockInit).toHaveBeenCalled();
  });

  // // it("passes the data object to the init function", () => {
  // //   const init = jest.fn(() => {
  // //     return { init: () => {} };
  // //   });

  // //   mount(<DOMContext {...props} data={{ foo: "bar" }} />);

  // //   expect(init).toHaveBeenCalledWith(
  // //     expect.objectContaining({
  // //       data: { foo: "bar" }
  // //     })
  // //   );
  // // });

  it("reports an error in the init function", () => {
    adInit.mockImplementation(() => {
      throw new Error("broken");
    });

    const runWithError = () => {
      mount(
        <DOMContext
          {...props}
          data={{ foo: "bar" }}
        />
      );
    };

    expect(runWithError).toThrowError("broken");
  });

  // it("throw an error", () => {
  //   const runWithError = () => {
  //     mount(
  //       <DOMContext
  //         init={({ eventCallback }) => eventCallback("error", "error message")}
  //         data={{ foo: "bar" }}
  //       />
  //     );
  //   };

  //   expect(runWithError).toThrowError("DomContext error: error message");
  // });

  // it("calls the renderComplete callback when a renderComplete event is dispatched", () => {
  //   const onRenderComplete = jest.fn();

  //   mount(
  //     <DOMContext
  //       init={({ eventCallback }) => eventCallback("renderComplete")}
  //       onRenderComplete={onRenderComplete}
  //     />
  //   );

  //   expect(onRenderComplete).toHaveBeenCalled();
  // });

  // it("does not error when init dispatches a renderComplete event but no onRenderComplete callback is provided", () => {
  //   const f = () =>
  //     mount(
  //       <DOMContext
  //         {...props}
  //         init={({ eventCallback }) => eventCallback("renderComplete")}
  //       />
  //     );
  //   expect(f).not.toThrow();
  // });

  // it("Doesn't throw an error when given an invalid event name", () => {
  //   /* eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }] */
  //   const component = mount(
  //     <DOMContext
  //       {...props}
  //       init={() => {
  //         return { init: () => {} };
  //       }}
  //     />
  //   );

  //   expect(() => {
  //     component.instance().processEvent({ type: "invalid" });
  //   }).not.toThrowError();
  // });

  it("should destroy all ad slots when unmounting", () => {
    adInit.mockImplementation(() => {
      return {
        init: mockInit,
        destroySlots: mockDestroySlots
      };
    });

    const wrapper = shallow(
      <DOMContext {...props} data={{}} />
    );

    wrapper.unmount();

    expect(mockDestroySlots).toHaveBeenCalled();
  });
});
