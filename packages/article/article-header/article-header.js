import React from "react";
import PropTypes from "prop-types";
import { Text, View, ViewPropTypes } from "react-native";

import HeaderLabel from "./article-header-label";
import HeaderFlags from "./article-header-flags";
import HeaderStandfirst from "./article-header-standfirst";
import styles from "../styles/article-header";

const { style: ViewStylePropTypes } = ViewPropTypes;

const ArticleHeader = ({ label, headline, standfirst, flags, style }) => (
  <View style={[...style]}>
    <HeaderLabel label={label} />
    <Text style={styles.articleHeadLineText}>{headline}</Text>
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
