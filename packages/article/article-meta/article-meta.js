import React from "react";
import { View } from "react-native";
import styles from "../styles/article-meta";
import ArticleMetaBase from "./article-meta-base";

const ArticleMeta = props => (
  <View style={[styles.articleMiddleContainer, styles.articleMeta]}>
    <ArticleMetaBase {...props} RowWrapper={View} />
  </View>
);

export default ArticleMeta;
