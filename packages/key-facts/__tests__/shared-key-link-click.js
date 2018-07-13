import React from "react";
import { shallow } from "enzyme";
import KeyFacts from "../src/key-facts";
import data from "../fixtures/key-facts.json";

const { data: { children, attributes } } = data;

export default () => {
  it("handle click event of a key event link", () => {
    const mockPress = jest.fn();

    const wrapper = shallow(
      <KeyFacts
        items={children[0].children}
        onLinkPress={mockPress}
        title={attributes.title}
      />
    );

    wrapper.find("TextLink").simulate("press");

    expect(mockPress).toHaveBeenCalled();
  });
};
