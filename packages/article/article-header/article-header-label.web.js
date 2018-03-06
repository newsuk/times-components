import React from "react";
import PropTypes from "prop-types";
import ArticleLabel from "@times-components/article-label";
import VideoLabel from "@times-components/video-label";
import { colours } from "@times-components/styleguide";
import styles from "../styles/article-header";

import { LabelContainer } from "../styles/article-header/responsive";

const HeaderLabel = ({ isVideo, label }) => {
  if (!isVideo && !label) return null;
  const Label = isVideo ? VideoLabel : ArticleLabel;
  return (
    <LabelContainer
      accessibilityLabel="label"
      testID="label"
      style={styles.articleLabel}
    >
      <Label title={label} color={colours.section.default} />
    </LabelContainer>
  );
};

HeaderLabel.propTypes = {
  label: PropTypes.string,
  isVideo: PropTypes.bool
};

HeaderLabel.defaultProps = {
  isVideo: false,
  label: null
};

export default HeaderLabel;
