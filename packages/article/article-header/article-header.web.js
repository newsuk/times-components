import React from "react";
import PropTypes from "prop-types";
import { View, ViewPropTypes } from "react-native";
import ArticleLabel from "@times-components/article-label";
import HeaderFlags from "./article-header-flags";
import HeaderStandfirst from "./article-header-standfirst";
import styles from "../styles/article-header";

import {
  HeadlineContainer,
  LabelContainer
} from "../styles/article-header/responsive";

const { style: ViewStylePropTypes } = ViewPropTypes;

const HeaderLabel = ({ label }) => {
  if (!label) return null;
  return (
    <LabelContainer
      accessibilityLabel="label"
      testID="label"
      style={styles.articleLabel}
    >
      <ArticleLabel title={label} color="#13354E" />
    </LabelContainer>
  );
};

HeaderLabel.propTypes = {
  label: PropTypes.string.isRequired
};

const ArticleHeader = ({ label, headline, standfirst, flags, style }) => (
  <View style={[...style]}>
    <HeaderLabel label={label} />
    <HeadlineContainer style={styles.articleHeadLineText}>
      {headline}
    </HeadlineContainer>
    <HeaderStandfirst standfirst={standfirst} />
    <HeaderFlags flags={flags} />
  </View>
);

ArticleHeader.propTypes = {
  headline: PropTypes.string.isRequired,
  label: PropTypes.string,
  standfirst: PropTypes.string,
  flags: PropTypes.arrayOf(PropTypes.string),
  style: ViewStylePropTypes
};

ArticleHeader.defaultProps = {
  label: null,
  standfirst: null,
  flags: [],
  style: {}
};

export default ArticleHeader;
