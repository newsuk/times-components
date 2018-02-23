import React from "react";
import PropTypes from "prop-types";
import ArticleLabel from "@times-components/article-label";
import { colours } from "@times-components/styleguide";
import styles from "../styles/article-header";

import { LabelContainer } from "../styles/article-header/responsive";

const HeaderLabel = ({ label }) => {
  if (!label) return null;
  return (
    <LabelContainer
      accessibilityLabel="label"
      testID="label"
      style={styles.articleLabel}
    >
      <ArticleLabel title={label} color={colours.section.default} />
    </LabelContainer>
  );
};

HeaderLabel.propTypes = {
  label: PropTypes.string
};

HeaderLabel.defaultProps = {
  label: null
};

export default HeaderLabel;
