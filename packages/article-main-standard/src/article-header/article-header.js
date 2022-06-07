/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { TcView } from "@times-components/utils";
import {
  ArticleFlags,
  UpdatedTimeProvider
} from "@times-components/ts-components";

import HeaderLabel from "../article-header-label/article-header-label";
import HeaderStandfirst from "./article-header-standfirst";
import styles from "../styles/article-header";

import { HeadlineContainer } from "../styles/article-header/responsive";

const ArticleHeader = ({
  flags,
  hasVideo,
  headline,
  label,
  standfirst,
  style,
  updatedTime
}) => (
  <TcView style={style}>
    <HeaderLabel isVideo={hasVideo} label={label} />
    <HeadlineContainer
      role="heading"
      aria-level="1"
      styles={styles.articleHeadLineText}
    >
      {headline}
    </HeadlineContainer>
    <HeaderStandfirst standfirst={standfirst} />
    <TcView style={styles.flags}>
      <UpdatedTimeProvider updatedTime={updatedTime}>
        <ArticleFlags flags={flags} />
      </UpdatedTimeProvider>
    </TcView>
  </TcView>
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
  style: PropTypes.object,
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
