/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/styleguide";
import {
  KeylineItem,
  ArticleKeylineItem
} from "@times-components/article-skeleton";
import {
  ArticleBylineWithLinks,
  hasBylineData
} from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";
import { defaultProps, propTypes } from "./article-meta-prop-types";

import styles from "../styles/article-meta";

const MetaTextElement = styled(Text)`
  padding-top: ${spacing(2)};

  &:last-child {
    padding-bottom: ${spacing(2)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    line-height: 18px;
    padding-bottom: ${spacing(5)} !important;
  }
`;

function ArticleMeta({
  bylines,
  publicationName,
  publishedTime,
  onAuthorPress,
  inline = false,
  className = ""
}) {
  const bylineRow = hasBylineData(bylines) ? (
    <MetaTextElement>
      <Text style={styles.byline}>
        <ArticleBylineWithLinks ast={bylines} onAuthorPress={onAuthorPress} />
      </Text>
    </MetaTextElement>
  ) : null;

  const publicationRow = (
    <MetaTextElement>
      <Text style={styles.datePublication}>
        <DatePublication date={publishedTime} publication={publicationName} />
      </Text>
    </MetaTextElement>
  );

  const KeylineComponent = inline ? ArticleKeylineItem : KeylineItem;

  return (
    <>
      {inline ? null : (
        <KeylineComponent className={className}>
          <View>{bylineRow}</View>
        </KeylineComponent>
      )}
      <KeylineComponent className={className}>
        <View>
          {inline ? bylineRow : null}
          {publicationRow}
        </View>
      </KeylineComponent>
    </>
  );
}

ArticleMeta.propTypes = {
  ...propTypes,
  inline: PropTypes.bool,
  className: PropTypes.string
};
ArticleMeta.defaultProps = defaultProps;

export default ArticleMeta;
