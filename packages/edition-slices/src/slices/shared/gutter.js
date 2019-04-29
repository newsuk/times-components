import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { editionMaxWidth, spacing } from "@times-components/styleguide";

const Gutter = ({ children }) => (
  <View
    style={{
      alignSelf: "center",
      maxWidth: "100%",
      width: editionMaxWidth,
      paddingHorizontal: spacing(2)
    }}
  >
    {children}
  </View>
);

Gutter.propTypes = {
  children: PropTypes.node.isRequired
};

export default Gutter;
