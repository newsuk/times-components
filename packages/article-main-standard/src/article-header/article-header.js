import React from "react";
import PropTypes from "prop-types";
import { View, ViewPropTypes } from "react-native";
import {
  ArticleFlags,
  UpdatedTimeProvider
} from "@times-components/ts-components";

import HeaderLabel from "../article-header-label/article-header-label";
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
  style,
  updatedTime
}) => (
  <View style={style}>
    <HeaderLabel isVideo={hasVideo} label={label} />
    <HeadlineContainer
      accessibilityRole="header"
      aria-level="1"
      style={styles.articleHeadLineText}
    >
      {headline}
    </HeadlineContainer>
    <HeaderStandfirst standfirst={standfirst} />
    <View style={styles.flags}>
      <UpdatedTimeProvider updatedTime={updatedTime}>
        <ArticleFlags flags={flags} />
      </UpdatedTimeProvider>
    </View>
  </View>
);

ArticleHeader.propTypes = {
  flags: PropTypes.arrayOf(
    PropTypes.shape({
      expiryTime: PropTypes.string,
      type: PropTypes.string
    })
  ),
  hasVideo: PropTypes.bool,
  headline: PropTypes.string.isRequired,
  label: PropTypes.string,
  standfirst: PropTypes.string,
  style: ViewStylePropTypes,
  updatedTime: PropTypes.string
};

ArticleHeader.defaultProps = {
  flags: [],
  hasVideo: false,
  label: null,
  standfirst: null,
  style: {},
  updatedTime: null
};

export default ArticleHeader;
