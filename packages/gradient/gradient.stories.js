import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { checkA11y } from "@storybook/addon-a11y";
import Gradient from "./gradient";

const styles = StyleSheet.create({
  container: {
    margin: 10
  }
});

const Component = ({ children, ...props }) => (
  <View
    style={{
      flex: 1,
      height: 250,
      width: "100%"
    }}
  >
    <Gradient {...props}>{children}</Gradient>
  </View>
);

Component.defaultProps = {
  children: null
};

Component.propTypes = {
  children: PropTypes.element
};

storiesOf("Primitives/Gradient", module)
  .addDecorator(checkA11y)
  .add("Default", () => (
    <Component
      style={{
        flex: 1
      }}
    />
  ))
  .add("With Styles", () => (
    <Component
      style={[
        {
          width: 200
        },
        {
          height: 200
        }
      ]}
    />
  ))
  .add("With stylesheets", () => (
    <Component
      degrees={270}
      style={[
        styles.container,
        {
          width: 200,
          height: 200
        }
      ]}
    />
  ))
  .add("With Angle (90)", () => (
    <Component
      degrees={90}
      style={{
        width: 200,
        height: 200
      }}
    />
  ))
  .add("With Angle (180)", () => (
    <Component
      degrees={180}
      style={{
        width: 200,
        height: 200
      }}
    />
  ))
  .add("With Angle (270)", () => (
    <Component
      degrees={270}
      style={{
        width: 200,
        height: 200
      }}
    />
  ));
