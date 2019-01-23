import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

import HeaderLabel from "../article-header-label/article-header-label";
import HeaderFlags from "./article-header-flags";
import HeaderStandfirst from "./article-header-standfirst";
import styles from "../styles/article-header";

const ArticleHeader = ({
  flags,
  hasVideo,
  headline,
  isTablet,
  label,
  standfirst
}) => (
  <View
    style={[
      styles.articleMainContentRow,
      isTablet && styles.articleMainContentRowTablet,
      isTablet && styles.headerTablet
    ]}
  >
    <HeaderLabel isVideo={hasVideo} label={label} />
    <Text
      selectable
      style={[
        styles.articleHeadLineText,
        isTablet && styles.articleHeadLineTextTablet
      ]}
    >
      {headline}
    </Text>
    <HeaderStandfirst standfirst={standfirst} />
    <HeaderFlags flags={flags} />
  </View>
);

ArticleHeader.propTypes = {
  flags: PropTypes.arrayOf(PropTypes.string),
  hasVideo: PropTypes.bool,
  headline: PropTypes.string.isRequired,
  isTablet: PropTypes.bool,
  label: PropTypes.string,
  standfirst: PropTypes.string
};

ArticleHeader.defaultProps = {
  flags: [],
  hasVideo: false,
  isTablet: false,
  label: null,
  standfirst: null
};

export default ArticleHeader;
