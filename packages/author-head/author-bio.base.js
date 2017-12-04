import React from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { renderTrees, treePropType } from "@times-components/markup";

const styles = StyleSheet.create({
  bio: {
    fontFamily: "TimesDigitalW04",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
    maxWidth: "88%",
    paddingBottom: 32
  }
});

const Bio = ({ bio, className }) => (
  <Text className={className} style={styles.bio}>
    {renderTrees(bio)}
  </Text>
);

Bio.propTypes = {
  bio: PropTypes.arrayOf(treePropType),
  className: PropTypes.string
};
Bio.defaultProps = { bio: [], className: "" };

export default Bio;
