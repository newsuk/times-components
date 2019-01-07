import React from "react";
import Context from "@times-components/context";
import Image from "@times-components/image";
import { fonts } from "@times-components/styleguide";

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
  AuthorImageContainer,
  FlagsContainer,
  HeaderContainer,
  HeadlineContainer
} from "../styles/responsive";

const ArticleHeader = ({
  authorImage,
  byline,
  flags,
  hasVideo,
  headline,
  label,
  publicationName,
  publishedTime,
  standfirst
}) => (
  <Context.Consumer>
    {({ theme: { headlineFont } }) => (
      <HeaderContainer style={styles.container}>
        <AuthorImageContainer style={styles.authorImage}>
          <Image aspectRatio={1} uri={authorImage} />
        </AuthorImageContainer>
        <Label isVideo={hasVideo} label={label} />
        <HeadlineContainer
          accessibilityRole="heading"
          aria-level="1"
          style={[
            styles.articleHeadline,
            headlineFont ? { fontFamily: fonts[headlineFont] } : null
          ]}
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
    )}
  </Context.Consumer>
);

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
