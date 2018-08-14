import React from "react";
import PropTypes from "prop-types";
import { Text, View, ViewPropTypes } from "react-native";

import HeaderLabel from "../article-header-label/article-header-label";
import HeaderFlags from "./article-header-flags";
import HeaderStandfirst from "./article-header-standfirst";
import styles from "../styles/article-header";

const { style: ViewStylePropTypes } = ViewPropTypes;

const ArticleHeader = ({
  flags,
  headline,
  isVideo,
  label,
  standfirst,
  style
}) => (
  <View style={[...style]}>
    <HeaderLabel isVideo={isVideo} label={label} />
    <Text style={styles.articleHeadLineText}>{headline}</Text>
    <HeaderStandfirst standfirst={standfirst} />
    <HeaderFlags flags={flags} />
  </View>
);

ArticleHeader.propTypes = {
  flags: PropTypes.arrayOf(PropTypes.string),
  headline: PropTypes.string.isRequired,
  isVideo: PropTypes.bool,
  label: PropTypes.string,
  standfirst: PropTypes.string,
  style: ViewStylePropTypes
};

ArticleHeader.defaultProps = {
  flags: [],
  isVideo: false,
  label: null,
  standfirst: null,
  style: {}
};

export default ArticleHeader;
