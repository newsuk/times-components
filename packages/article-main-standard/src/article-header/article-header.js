import React from "react";
import PropTypes from "prop-types";
import { Text, View, ViewPropTypes } from "react-native";
import { ArticleFlags } from "@times-components/article-flag";

import HeaderLabel from "../article-header-label/article-header-label";
import HeaderStandfirst from "./article-header-standfirst";
import styles from "../styles/article-header";

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
    <Text selectable style={styles.articleHeadLineText}>
      {headline}
    </Text>
    <HeaderStandfirst standfirst={standfirst} />
    <View style={styles.flags}>
      <ArticleFlags flags={flags} />
    </View>
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
