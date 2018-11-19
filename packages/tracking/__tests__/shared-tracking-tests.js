import { Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";

const TestComponent = ({ someProp }) => <Text>{someProp}</Text>;
TestComponent.propTypes = { someProp: PropTypes.string };
TestComponent.defaultProps = { someProp: "foo" };
TestComponent.someStatic = { foo: "bar" };

export default trackingEnhancer => {
  it("renders when tracking context is missing", () => {
    const WithTracking = trackingEnhancer(TestComponent);

    const tree = renderer.create(<WithTracking />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("forwards props to wrapped component", () => {
    const WithTracking = trackingEnhancer(TestComponent);
    const tree = renderer.create(<WithTracking someProp="bar" />);

    expect(tree).toMatchSnapshot();
  });

  it("hoists wrapped propTypes", () => {
    const WithTracking = trackingEnhancer(TestComponent);

    expect(WithTracking.propTypes).toEqual(TestComponent.propTypes);
  });

  it("hoists wrapped defaultProps", () => {
    const WithTracking = trackingEnhancer(TestComponent);

    expect(WithTracking.defaultProps).toEqual(TestComponent.defaultProps);
  });

  it("hoists wrapped statics", () => {
    const WithTracking = trackingEnhancer(TestComponent);

    expect(WithTracking.someStatic).toEqual(TestComponent.someStatic);
  });
};
