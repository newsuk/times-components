import React from "react";
import styles from "../styles/article-meta";
import ArticleMetaBase from "./article-meta-base";
import { MetaTextElement, Meta } from "../styles/article-meta/responsive";

const ArticleMeta = props => (
  <Meta style={[styles.articleMiddleContainer, styles.articleMeta]}>
    <ArticleMetaBase {...props} RowWrapper={MetaTextElement} />
  </Meta>
);

export default ArticleMeta;
