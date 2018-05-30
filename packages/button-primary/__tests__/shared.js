import "react-native";
import React from "react";
import { shallow } from "enzyme";
import ButtonPrimary from "../src/button-primary";

export default () => {
  it("should render the button correctly", () => {
    const onPressMock = () => {};
    const wrapper = shallow(
      <ButtonPrimary onPress={onPressMock} title="test button" />
    );

    expect(wrapper).toMatchSnapshot("1. Render the button");
  });

  it("should handle the onPress event", () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <ButtonPrimary onPress={onPressMock} title="test button" />
    );

    wrapper.simulate("press");

    expect(onPressMock).toHaveBeenCalled();
  });
};
