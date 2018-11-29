import React from "react";

import Label from "../article-label/article-label";
import Flags from "../article-flags/article-flags";
import Meta from "../article-meta/article-meta";
import Standfirst from "../article-standfirst/article-standfirst";
import {
  articleHeaderPropTypes,
  articleHeaderDefaultProps
} from "./article-header-prop-types";
import styles from "../styles";

import {
  FlagsContainer,
  HeaderContainer,
  HeadlineContainer
} from "../styles/responsive";

const ArticleHeader = ({
  byline,
  flags,
  headline,
  label,
  publicationName,
  publishedTime,
  standfirst
}) => (
  <HeaderContainer style={styles.container}>
    <Label label={label} />
    <HeadlineContainer
      accessibilityRole="heading"
      aria-level="1"
      style={styles.articleHeadline}
    >
      {headline}
    </HeadlineContainer>
    <FlagsContainer>
      <Flags flags={flags} />
    </FlagsContainer>
    <Standfirst standfirst={standfirst} />
    <Meta
      byline={byline}
      publicationName={publicationName}
      publishedTime={publishedTime}
    />
  </HeaderContainer>
);

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
