import React from "react";
import {
  ArticleFlags,
  UpdatedTimeProvider
} from "@times-components/ts-components";
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
  standfirst,
  updatedTime
}) => (
  <HeaderContainer style={{ ...styles.header, ...styles.container }}>
    <AuthorImageContainer style={styles.authorImage}>
      <Image
        aspectRatio={1}
        uri={authorImage}
        accessibilityLabel="author-image"
      />
    </AuthorImageContainer>
    <Label isVideo={hasVideo} label={label} />
    <HeadlineContainer
      role="heading"
      aria-level="1"
      styles={styles.articleHeadline}
    >
      {headline}
    </HeadlineContainer>
    <FlagsContainer>
      <UpdatedTimeProvider updatedTime={updatedTime}>
        <ArticleFlags flags={flags} />
      </UpdatedTimeProvider>
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
