import React from "react";
import { mount, shallow } from "enzyme";
import adInit from "../../src/utils/ad-init";
import DOMContext from "../../src/dom-context.web";

const mockInit = jest.fn();
const mockDestroySlots = jest.fn();
jest.mock("../../src/utils/ad-init", () =>
  jest.fn().mockImplementation(() => ({
    init: mockInit,
    destroySlots: mockDestroySlots
  }))
);

describe("web", () => {
  const props = {
    data: { foo: "bar" },
    height: 200,
    width: 200
  };

  it("should initialise the ad code", () => {
    mount(<DOMContext {...props} />);

    expect(mockInit).toHaveBeenCalled();
  });

  it("should handle an error", () => {
    jest.spyOn(console, "error").mockImplementation();

    adInit.mockImplementation(() =>
      throw new Error("broken")
    );

    const runWithError = () => {
      mount(<DOMContext {...props} />);
    };

    expect(runWithError).toThrowError("broken");
  });

  it("should destroy all ad slots when unmounting", () => {
    adInit.mockImplementation(() => ({
      init: mockInit,
      destroySlots: mockDestroySlots
    }));

    const wrapper = shallow(<DOMContext {...props} />);

    wrapper.unmount();

    expect(mockDestroySlots).toHaveBeenCalled();
  });
});
