import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
import {
  CenteredDecorator,
  BarSpacingDecorator,
  LateralSpacingDecorator,
  WhiteBgColorDecorator
} from "../decorators";

const WrappedComponent = () => <Text>I am in Storybook!</Text>;

module.exports = () => {
  it("should render a Centered Decorator", () => {
    const component = renderer
      .create(CenteredDecorator(() => <WrappedComponent />))
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("should render a Bar Spacing Decorator", () => {
    const component = renderer
      .create(BarSpacingDecorator(() => <WrappedComponent />))
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("should render a Lateral Spacing Decorator", () => {
    const component = renderer
      .create(LateralSpacingDecorator(() => <WrappedComponent />))
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("should render a White Background Decorator", () => {
    const component = renderer
      .create(WhiteBgColorDecorator(() => <WrappedComponent />))
      .toJSON();
    expect(component).toMatchSnapshot();
  });
};
