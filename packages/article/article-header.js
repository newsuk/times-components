import React from "react";
import PropTypes from "prop-types";
import ArticleHeadline from "@times-components/article-headline";
import {
  NewArticleFlag,
  SponsoredArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag
} from "@times-components/article-flag";
import ArticleLabel from "@times-components/article-label";
import { Text, View } from "react-native";
import styles from "./article-style";

const flagsMapping = new Map([
  ["NEW", <NewArticleFlag />],
  ["UPDATED", <UpdatedArticleFlag />],
  ["EXCLUSIVE", <ExclusiveArticleFlag />],
  ["SPONSORED", <SponsoredArticleFlag />]
]);
const ArticleHeader = ({ label, title, standfirst, flags }) => (
  <View style={[styles.articleMainContentRow]}>
    {label ? (
      <View style={styles.articleLabel}>
        <ArticleLabel title={label} color="#13354E" />
      </View>
    ) : null}
    <View style={[styles.articleHeadline]}>
      <ArticleHeadline title={title} style={styles.articleHeadLineText} />
    </View>
    {standfirst ? <Text style={[styles.standFirst]}>{standfirst}</Text> : null}
    {flags.length ? (
      <View style={[styles.articleFlag]}>
        {flags.map(i => (
          <View key={i} style={styles.articleFlagContainer}>
            {flagsMapping.get(i)}
          </View>
        ))}
      </View>
    ) : null}
  </View>
);

ArticleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  standfirst: PropTypes.string,
  flags: PropTypes.arrayOf(PropTypes.string)
};

ArticleHeader.defaultProps = {
  label: null,
  standfirst: null,
  flags: []
};

export default ArticleHeader;
