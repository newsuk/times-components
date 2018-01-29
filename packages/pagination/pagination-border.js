import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  border: {
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 1,
    borderTopColor: "#dbdbdb",
    borderTopWidth: 1
  }
});

const PaginationBorder = ({ children }) => (
  <View style={styles.border}>{children}</View>
);

PaginationBorder.propTypes = {
  children: PropTypes.node.isRequired
};

export default PaginationBorder;
