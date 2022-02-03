import React from "react";
import Context from "@times-components/context";
import { ArticleFlags } from "@times-components/ts-components";
import { fonts } from "@times-components/styleguide";

import Label from "../article-label/article-label";
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
  bylines,
  flags,
  hasVideo,
  headline,
  label,
  publicationName,
  publishedTime,
  standfirst
}) => (
  <Context.Consumer>
    {({ theme: { headlineFont, headlineCase } }) => (
      <HeaderContainer style={styles.container}>
        <Label isVideo={hasVideo} label={label} />
        <HeadlineContainer
          accessibilityRole="header"
          aria-level="1"
          style={[
            styles.articleHeadline,
            headlineFont ? { fontFamily: fonts[headlineFont] } : null,
            headlineCase ? { textTransform: headlineCase } : null
          ]}
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
    )}
  </Context.Consumer>
);

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
