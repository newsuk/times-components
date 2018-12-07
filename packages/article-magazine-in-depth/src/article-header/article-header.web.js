import React from "react";

import Label from "../article-label/article-label";
import Flags from "../article-flags/article-flags";
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

const ArticleHeader = ({ flags, headline, label, standfirst }) => (
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
  </HeaderContainer>
);

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
