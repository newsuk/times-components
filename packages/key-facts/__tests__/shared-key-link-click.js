import React from "react";
import { shallow } from "enzyme";
import { scales } from "@times-components/styleguide";
import KeyFactsText from "../src/key-facts-text";
import data from "../fixtures/key-facts-test.json";

export default () => {
  it("handle the click event", () => {
    const mockLinkPress = jest.fn();
    const { children: keyFactsItems } = data.children[0];
    const wrapper = shallow(
      <KeyFactsText
        color="#FFFFFF"
        fontSize={scales.medium}
        item={keyFactsItems[1]}
        listIndex={1}
        onLinkPress={mockLinkPress}
      />
    );

    wrapper.find("TextLink").simulate("press");

    expect(mockLinkPress).toHaveBeenCalled();
  });
};
