import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import Gradient from "./src/gradient";

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

export default {
  name: "Primitives/Gradient",
  children: [
    {
      type: "story",
      name: "Default",
      component: () => (
        <Component
          style={{
            flex: 1
          }}
        />
      )
    },
    {
      type: "story",
      name: "With Styles",
      component: () => (
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
      )
    },
    {
      type: "story",
      name: "With stylesheets",
      component: () => (
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
      )
    },
    {
      type: "story",
      name: "With Angle (90)",
      component: () => (
        <Component
          degrees={90}
          style={{
            width: 200,
            height: 200
          }}
        />
      )
    },
    {
      type: "story",
      name: "With Angle (180)",
      component: () => (
        <Component
          degrees={180}
          style={{
            width: 200,
            height: 200
          }}
        />
      )
    },
    {
      type: "story",
      name: "With Angle (270)",
      component: () => (
        <Component
          degrees={270}
          style={{
            width: 200,
            height: 200
          }}
        />
      )
    }
  ]
};
