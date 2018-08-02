import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
import {
  CenteredDecorator,
  BarSpacingDecorator,
  LateralSpacingDecorator,
  WhiteBgColorDecorator
} from "../src/storybook";
import "./shared-showcase";

const WrappedComponent = () => <Text>I am in Storybook!</Text>;

export default () => {
  it("Centered Decorator", () => {
    const component = renderer
      .create(CenteredDecorator(() => <WrappedComponent />))
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("Bar Spacing Decorator", () => {
    const component = renderer
      .create(BarSpacingDecorator(() => <WrappedComponent />))
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("Lateral Spacing Decorator", () => {
    const component = renderer
      .create(LateralSpacingDecorator(() => <WrappedComponent />))
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("White Background Decorator", () => {
    const component = renderer
      .create(WhiteBgColorDecorator(() => <WrappedComponent />))
      .toJSON();
    expect(component).toMatchSnapshot();
  });
};
