import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "column"
  }
});

const PaginationContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

PaginationContainer.propTypes = {
  children: PropTypes.node.isRequired
};

PaginationContainer.defaultProps = {};

export default PaginationContainer;
