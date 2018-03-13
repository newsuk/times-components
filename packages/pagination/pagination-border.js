import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { colours } from "@times-components/styleguide";

const styles = StyleSheet.create({
  border: {
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: 1,
    borderTopColor: colours.functional.keyline,
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
