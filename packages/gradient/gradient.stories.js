/* eslint import/no-unresolved: "off" */

import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import Gradient from "./gradient";

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

storiesOf("Gradient", module)
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
