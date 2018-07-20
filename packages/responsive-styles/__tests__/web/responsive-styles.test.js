import React from "react";
import PropTypes from "prop-types";
import TestRenderer from "react-test-renderer";
import "jest-styled-components";

import withResponsiveStyles from "../../src/responsive-styles";

const Hello = ({ className }) => <div className={className}>Hello</div>;
Hello.propTypes = { className: PropTypes.string };
Hello.defaultProps = { className: "" };

it("handles missing styles object", () => {
  const WithStyles = withResponsiveStyles("div");
  const testInstance = TestRenderer.create(
    <WithStyles>Foo</WithStyles>
  ).toJSON();

  expect(testInstance).toMatchSnapshot();
});

it("handles empty styles object", () => {
  const WithStyles = withResponsiveStyles("div", {});
  const testInstance = TestRenderer.create(
    <WithStyles>Foo</WithStyles>
  ).toJSON();

  expect(testInstance).toMatchSnapshot();
});

it("applies styles for all breakpoints", () => {
  const WithColours = withResponsiveStyles("div", {
    base: () => "color: orange;",
    smallUp: () => "color: red;",
    mediumUp: () => "color: blue;",
    wideUp: () => "color: green;",
    hugeUp: () => "color: yellow;"
  });
  const testInstance = TestRenderer.create(
    <WithColours>Foo</WithColours>
  ).toJSON();

  expect(testInstance).toMatchSnapshot();
});

it("optimises un-used breakpoints away", () => {
  const WithStyles = withResponsiveStyles("div", {
    mediumUp: () => "color: blue;"
  });
  const testInstance = TestRenderer.create(
    <WithStyles>Foo</WithStyles>
  ).toJSON();

  expect(testInstance).toMatchSnapshot();
});

it("applies styles to custom components via className", () => {
  const BlueHello = withResponsiveStyles(Hello, {
    mediumUp: () => "color: blue;"
  });
  const testInstance = TestRenderer.create(<BlueHello>Foo</BlueHello>).toJSON();

  expect(testInstance).toMatchSnapshot();
});

it("supports responsive styles based on props", () => {
  const ResponsiveHello = withResponsiveStyles(Hello, {
    mediumUp: props => `
      color: ${props.special ? "red" : "blue"};
    `
  });
  const testInstance = TestRenderer.create(
    <ResponsiveHello special>Foo</ResponsiveHello>
  ).toJSON();

  expect(testInstance).toMatchSnapshot();
});
