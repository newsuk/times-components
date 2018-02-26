import React from "react";
import PropTypes from "prop-types";
import ArticleLabel from "@times-components/article-label";
import { colours } from "@times-components/styleguide";
import { View } from "react-native";
import styles from "../styles/article-header";

const HeaderLabel = ({ label }) => {
  if (!label) return null;
  return (
    <View accessibilityLabel="label" testID="label" style={styles.articleLabel}>
      <ArticleLabel title={label} color={colours.section.default} />
    </View>
  );
};

HeaderLabel.propTypes = {
  label: PropTypes.string
};

HeaderLabel.defaultProps = {
  label: null
};

export default HeaderLabel;
