import "react-native";
import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import "jest-styled-components";

import withResponsiveStyles from "../../src/responsive-styles";

const Hello = ({ className }) => <div className={className}>Hello</div>;
Hello.propTypes = { className: PropTypes.string };
Hello.defaultProps = { className: "" };

it("handles missing styles object", () => {
  const WithStyles = withResponsiveStyles("div");
  const tree = renderer.create(<WithStyles>Foo</WithStyles>).toJSON();

  expect(tree).toMatchSnapshot();
});

it("handles empty styles object", () => {
  const WithStyles = withResponsiveStyles("div", {});
  const tree = renderer.create(<WithStyles>Foo</WithStyles>).toJSON();

  expect(tree).toMatchSnapshot();
});

it("applies styles for all breakpoints", () => {
  const WithColours = withResponsiveStyles("div", {
    base: () => "color: orange;",
    smallUp: () => "color: red;",
    mediumUp: () => "color: blue;",
    wideUp: () => "color: green;",
    hugeUp: () => "color: yellow;"
  });
  const tree = renderer.create(<WithColours>Foo</WithColours>).toJSON();

  expect(tree).toMatchSnapshot();
});

it("optimises un-used breakpoints away", () => {
  const WithStyles = withResponsiveStyles("div", {
    mediumUp: () => "color: blue;"
  });
  const tree = renderer.create(<WithStyles>Foo</WithStyles>).toJSON();

  expect(tree).toMatchSnapshot();
});

it("applies styles to custom components via className", () => {
  const BlueHello = withResponsiveStyles(Hello, {
    mediumUp: () => "color: blue;"
  });
  const tree = renderer.create(<BlueHello>Foo</BlueHello>).toJSON();

  expect(tree).toMatchSnapshot();
});

it("supports responsive styles based on props", () => {
  const ResponsiveHello = withResponsiveStyles(Hello, {
    mediumUp: props => `
      color: ${props.special ? "red" : "blue"};
    `
  });
  const tree = renderer
    .create(<ResponsiveHello special>Foo</ResponsiveHello>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
