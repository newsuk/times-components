import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { editionMaxWidth } from "@times-components/styleguide";

const Gutter = ({ children }) => (
  <View
    style={{
      alignSelf: "center",
      maxWidth: "100%",
      width: editionMaxWidth
    }}
  >
    {children}
  </View>
);

Gutter.propTypes = {
  children: PropTypes.node.isRequired
};

export default Gutter;
