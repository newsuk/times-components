/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { TcText, TcView, checkStylesForUnits } from "@times-components/utils";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/ts-styleguide";
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

const MetaTextElement = styled(TcText)`
  padding-top: ${spacing(2)};

  &:last-child {
    padding-bottom: ${spacing(2)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    line-height: 18px;
    padding-bottom: ${spacing(2)};
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
      <TcText style={checkStylesForUnits(styles.byline)}>
        <ArticleBylineWithLinks ast={bylines} onAuthorPress={onAuthorPress} />
      </TcText>
    </MetaTextElement>
  ) : null;

  const publicationRow = (
    <MetaTextElement>
      <TcText style={checkStylesForUnits(styles.datePublication)}>
        <DatePublication date={publishedTime} publication={publicationName} />
      </TcText>
    </MetaTextElement>
  );

  const KeylineComponent = inline ? ArticleKeylineItem : KeylineItem;

  return (
    <>
      {inline ? null : (
        <KeylineComponent className={className}>
          <TcView>{bylineRow}</TcView>
        </KeylineComponent>
      )}
      <KeylineComponent className={className}>
        <TcView>
          {inline ? bylineRow : null}
          {publicationRow}
        </TcView>
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
