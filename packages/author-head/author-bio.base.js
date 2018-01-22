import React from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { renderTrees, treePropType } from "@times-components/markup";

const styles = StyleSheet.create({
  bio: {
    fontFamily: "TimesDigital-Regular",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 26,
    color: "#333"
  }
});

const Bio = ({ bio }) => <Text style={styles.bio}>{renderTrees(bio)}</Text>;

Bio.propTypes = {
  bio: PropTypes.arrayOf(treePropType)
};
Bio.defaultProps = { bio: [] };

export default Bio;
