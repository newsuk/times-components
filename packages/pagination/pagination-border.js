import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  border: {
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50
  },
  borderTop: {
    borderTopColor: "#dbdbdb",
    borderTopWidth: 1
  },
  borderBottom: {
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 1
  }
});

const PaginationBorder = ({ children, hideResults }) => (
  <View
    style={[
      styles.border,
      hideResults && styles.borderTop,
      styles.borderBottom
    ]}
  >
    {children}
  </View>
);

PaginationBorder.propTypes = {
  children: PropTypes.string.isRequired,
  hideResults: PropTypes.bool
};

PaginationBorder.defaultProps = {
  hideResults: false
};

export default PaginationBorder;
