import React from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { renderTrees, treePropType } from "@times-components/markup";
import { colours, fonts } from "@times-components/styleguide";

const styles = StyleSheet.create({
  bio: {
    fontFamily: fonts.body,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 26,
    color: colours.functional.primary
  }
});

const Bio = ({ bio }) => (
  <Text testID="author-bio" style={styles.bio}>
    {renderTrees(bio)}
  </Text>
);

Bio.propTypes = {
  bio: PropTypes.arrayOf(treePropType)
};
Bio.defaultProps = { bio: [] };

export default Bio;
