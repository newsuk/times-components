import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/styleguide";
import { KeylineItem } from "@times-components/article-skeleton";
import { ArticleBylineWithLinks } from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";
import { defaultProps, propTypes } from "./article-meta-prop-types";

import styles from "../styles/article-meta";
import { hasBylineData } from "./util";

export const MetaTextElement = styled(Text)`
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
  isWide
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

  return (
    <>
      {isWide ? (
        <KeylineItem>
          <View>{bylineRow}</View>
        </KeylineItem>
      ) : null}
      <KeylineItem>
        <View>
          {isWide ? null : bylineRow}
          {publicationRow}
        </View>
      </KeylineItem>
    </>
  );
}

ArticleMeta.propTypes = propTypes;
ArticleMeta.defaultProps = defaultProps;

export default ArticleMeta;
