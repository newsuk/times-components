import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { sliceContentMaxWidth } from "@times-components/styleguide";

const ContentWrapper = ({ children }) => (
  <View
  style={{
    flex:1,
    alignSelf: "center",
    width: sliceContentMaxWidth
  }}
  >
    {children}
  </View>
)

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContentWrapper;