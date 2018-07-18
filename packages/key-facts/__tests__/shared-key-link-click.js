import React from "react";
import { shallow } from "enzyme";
import KeyFacts from "../src/key-facts";
import data from "../fixtures/key-facts-test.json";

const { data: { children } } = data;

export default () => {
  it("handle the click event", () => {
    const mockLinkPress = jest.fn();

    const wrapper = shallow(
      <KeyFacts ast={children[0].children} onLinkPress={mockLinkPress} />
    );

    wrapper.find("TextLink").simulate("press");

    expect(mockLinkPress).toHaveBeenCalled();
  });
};
