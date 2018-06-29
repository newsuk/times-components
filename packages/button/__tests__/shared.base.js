import "react-native";
import React from "react";
import { shallow } from "enzyme";
import Button from "../src/button";

export default renderMethod => {
  it("should render the button", () => {
    const wrapper = renderMethod(
      <Button onPress={() => null} title="test button" />
    );

    expect(wrapper).toMatchSnapshot("1. Render the button");
  });

  it("should handle the onPress event", () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <Button onPress={onPressMock} title="test button" />
    );

    wrapper.simulate("press");

    expect(onPressMock).toHaveBeenCalled();
  });
};
