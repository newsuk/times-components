import React from "react";
import { ArticleFlags } from "@times-components/article-flag";
import Image from "@times-components/image";

import Label from "../article-label/article-label";
import Meta from "../article-meta/article-meta";
import Standfirst from "../article-standfirst/article-standfirst";
import {
  articleHeaderPropTypes,
  articleHeaderDefaultProps
} from "./article-header-prop-types";
import styles from "../styles";

import {
  AuthorImageContainer,
  FlagsContainer,
  HeaderContainer,
  HeadlineContainer
} from "../styles/responsive";

const ArticleHeader = ({
  authorImage,
  bylines,
  flags,
  hasVideo,
  headline,
  label,
  publicationName,
  publishedTime,
  standfirst
}) => (
  <HeaderContainer style={[styles.header, styles.container]}>
    <AuthorImageContainer style={styles.authorImage}>
      <Image aspectRatio={1} uri={authorImage} />
    </AuthorImageContainer>
    <Label isVideo={hasVideo} label={label} />
    <HeadlineContainer
      accessibilityRole="header"
      aria-level="1"
      style={styles.articleHeadline}
    >
      {headline}
    </HeadlineContainer>
    <FlagsContainer>
      <ArticleFlags flags={flags} />
    </FlagsContainer>
    <Standfirst standfirst={standfirst} />
    <Meta
      bylines={bylines}
      publicationName={publicationName}
      publishedTime={publishedTime}
    />
  </HeaderContainer>
);

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
