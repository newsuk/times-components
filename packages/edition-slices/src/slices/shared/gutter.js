import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { ResponsiveContext } from "@times-components/responsive";
import {
  editionMaxWidth,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const Gutter = ({ children }) => (
  <ResponsiveContext.Consumer>
    {({ isTablet, editionBreakpoint }) => {
      const tabletPaddingHorizontalResolver = {
        [editionBreakpoints.medium]: spacing(2),
        [editionBreakpoints.wide]: spacing(6),
        [editionBreakpoints.huge]: spacing(2)
      };

      return (
        <View
          style={{
            alignSelf: "center",
            maxWidth: "100%",
            paddingHorizontal: isTablet
              ? tabletPaddingHorizontalResolver[editionBreakpoint]
              : 0,
            width: editionMaxWidth
          }}
        >
          {children}
        </View>
      );
    }}
  </ResponsiveContext.Consumer>
);

Gutter.propTypes = {
  children: PropTypes.node.isRequired
};

export default Gutter;
