import React from "react";
import { TcText } from "@times-components/utils";
import renderer from "react-test-renderer";
import {
  CenteredDecorator,
  BarSpacingDecorator,
  LateralSpacingDecorator,
  WhiteBgColorDecorator
} from "../src/storybook";
import { StrictWrapper } from "../src/showcase-to-storybook";
import "./shared-showcase";

const WrappedComponent = () => <TcText>I am in Storybook!</TcText>;

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
