import React from "react";
import PropTypes from "prop-types";
import { Text, View, ViewPropTypes } from "react-native";

import { colours } from "@times-components/styleguide";
import HeaderLabel from "../article-header-label/article-header-label";
import HeaderFlags from "./article-header-flags";
import HeaderStandfirst from "./article-header-standfirst";
import styles from "../styles/article-header";

const { style: ViewStylePropTypes } = ViewPropTypes;

const ArticleHeader = ({
  label,
  headline,
  standfirst,
  flags,
  isVideo,
  section,
  style
}) => (
  <View style={[...style]}>
    <HeaderLabel
      color={colours.section[section]}
      isVideo={isVideo}
      label={label}
    />
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
  isVideo: PropTypes.bool,
  section: PropTypes.string,
  style: ViewStylePropTypes
};

ArticleHeader.defaultProps = {
  label: null,
  standfirst: null,
  flags: [],
  isVideo: false,
  section: null,
  style: {}
};

export default ArticleHeader;
