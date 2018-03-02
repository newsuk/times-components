import React from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { renderTrees, treePropType } from "@times-components/markup";
import { fonts } from "@times-components/styleguide";

const styles = StyleSheet.create({
  bio: {
    fontFamily: fonts.body,
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
