import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { ResponsiveContext } from "@times-components/responsive";
import { editionMaxWidth, spacing } from "@times-components/styleguide";

const Gutter = ({ children }) => (
  <ResponsiveContext.Consumer>
    {({ isTablet }) => (
      <View
        style={{
          alignSelf: "center",
          maxWidth: "100%",
          paddingHorizontal: isTablet ? spacing(2) : 0,
          width: editionMaxWidth
        }}
      >
        {children}
      </View>
    )}
  </ResponsiveContext.Consumer>
);

Gutter.propTypes = {
  children: PropTypes.node.isRequired
};

export default Gutter;
