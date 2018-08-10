import React from "react";
import { shallow } from "enzyme";
import { scales } from "@times-components/context";
import KeyFactsText from "../src/key-facts-text";
import data from "../fixtures/key-facts-test.json";
import styleFactory from "../src/styles";

export default () => {
  it("handle the click event", () => {
    const mockLinkPress = jest.fn();
    const { children: keyFactsItems } = data.children[0];
    const styles = styleFactory(scales.medium, "#FFFFFF");
    const wrapper = shallow(
      <KeyFactsText
        item={keyFactsItems[1]}
        listIndex={1}
        onLinkPress={mockLinkPress}
        styles={styles}
      />
    );

    wrapper.find("TextLink").simulate("press");

    expect(mockLinkPress).toHaveBeenCalled();
  });
};
