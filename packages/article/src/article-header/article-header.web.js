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
  label,
  headline,
  standfirst,
  flags,
  isVideo,
  style
}) => (
  <View style={[...style]}>
    <HeaderLabel isVideo={isVideo} label={label} />
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
  headline: PropTypes.string.isRequired,
  label: PropTypes.string,
  standfirst: PropTypes.string,
  flags: PropTypes.arrayOf(PropTypes.string),
  isVideo: PropTypes.bool,
  style: ViewStylePropTypes
};

ArticleHeader.defaultProps = {
  label: null,
  standfirst: null,
  flags: [],
  isVideo: false,
  style: {}
};

export default ArticleHeader;
