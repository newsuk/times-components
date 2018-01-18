import React from "react";
import PropTypes from "prop-types";
import ArticleLabel from "@times-components/article-label";
import { View } from "react-native";
import styles from "../styles/article-header";

const HeaderLabel = ({ label }) => {
  if (!label) return null;
  return (
    <View accessibilityLabel="label" testID="label" style={styles.articleLabel}>
      <ArticleLabel title={label} color="#13354E" />
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
