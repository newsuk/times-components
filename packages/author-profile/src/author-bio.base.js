import React from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { renderTrees, treePropType } from "@times-components/markup";
import { colours, fonts, fontSizes } from "@times-components/styleguide";

const styles = StyleSheet.create({
  bio: {
    fontFamily: fonts.body,
    textAlign: "center",
    fontSize: fontSizes.secondary,
    lineHeight: 26,
    color: colours.functional.primary
  }
});

const Bio = ({ biography }) => (
  <Text testID="author-bio" style={styles.bio}>
    {renderTrees(biography)}
  </Text>
);

Bio.propTypes = {
  biography: PropTypes.arrayOf(treePropType)
};
Bio.defaultProps = { biography: [] };

export default Bio;
