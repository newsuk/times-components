import React from "react";
import PropTypes from "prop-types";
import { View, ViewPropTypes } from "react-native";

import HeaderLabel from "../article-header-label/article-header-label";
import HeaderFlags from "./article-header-flags";
import HeaderStandfirst from "./article-header-standfirst";
import styles from "../styles/article-header";

import { HeadlineContainer } from "../styles/article-header/responsive";

const { style: ViewStylePropTypes } = ViewPropTypes;

const ArticleHeader = ({
  flags,
  hasVideo,
  headline,
  label,
  standfirst,
  style
}) => (
  <View style={[...style]}>
    <HeaderLabel isVideo={hasVideo} label={label} />
    <HeadlineContainer
      accessibilityRole="heading"
      aria-level="1"
      style={styles.articleHeadLineText}
    >
      {headline}
    </HeadlineContainer>
    <HeaderStandfirst standfirst={standfirst} />
    <HeaderFlags flags={flags} />
  </View>
);

ArticleHeader.propTypes = {
  flags: PropTypes.arrayOf(PropTypes.string),
  hasVideo: PropTypes.bool,
  headline: PropTypes.string.isRequired,
  label: PropTypes.string,
  standfirst: PropTypes.string,
  style: ViewStylePropTypes
};

ArticleHeader.defaultProps = {
  flags: [],
  hasVideo: false,
  label: null,
  standfirst: null,
  style: {}
};

export default ArticleHeader;
