/**
 * ContentWrapper restricts the content area of each slice. It is used together with the Gutter component,
 * which sets the gutter space around the content. This component is currently used only for huge breakpoints.
 */

import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";

const ContentWrapper = ({ children }) => (
  <View style={styles.contentWrapperStyles}>{children}</View>
);

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContentWrapper;
