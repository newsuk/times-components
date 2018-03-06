import React from "react";
import PropTypes from "prop-types";
import ArticleLabel from "@times-components/article-label";
import VideoLabel from "@times-components/video-label";
import { colours } from "@times-components/styleguide";
import { View } from "react-native";
import styles from "../styles/article-header";

const HeaderLabel = ({ isVideo, label }) => {
  if (!isVideo && !label) return null;
  const Label = isVideo ? VideoLabel : ArticleLabel;
  return (
    <View accessibilityLabel="label" testID="label" style={styles.articleLabel}>
      <Label title={label} color={colours.section.default} />
    </View>
  );
};

HeaderLabel.propTypes = {
  isVideo: PropTypes.bool,
  label: PropTypes.string
};

HeaderLabel.defaultProps = {
  isVideo: false,
  label: null
};

export default HeaderLabel;
