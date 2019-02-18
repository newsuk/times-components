import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
import {
  CenteredDecorator,
  BarSpacingDecorator,
  LateralSpacingDecorator,
  WhiteBgColorDecorator
} from "../src/storybook";
import { reverseOptions } from "../src/select-shim";
import { StrictWrapper } from "../src/showcase-to-storybook";
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

  it("reverseOptions should reverse a set of options given to it.", () => {
    const reverse = reverseOptions({ test1: "testing1", test2: "testing2" });
    expect(reverse).toEqual({ testing1: "test1", testing2: "test2" });
  });

  it("StrictWrapper to wrap child components in Strict Mode", () => {
    const component = renderer
      .create(
        <StrictWrapper>
          <WrappedComponent />
        </StrictWrapper>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
};
