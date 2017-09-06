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

const ArticleHeader = ({ label, title, standfirst, flags }) =>
  <View style={[styles.ArticleMainContentRow]}>
    {label
      ? <View style={styles.ArticleLabel}>
          <ArticleLabel title={label} color="#008347" />
        </View>
      : null}
    <View style={[styles.ArticleHeadline]}>
      <ArticleHeadline title={title} style={styles.ArticleHeadLineText} />
    </View>
    {standfirst
      ? <Text style={[styles.StandFirst]}>
          {standfirst}
        </Text>
      : null}
    {flags.length
      ? <View style={[styles.ArticleFlag]}>
          {flags.includes("NEW")
            ? <View style={styles.ArticleFlagContainer}>
                <NewArticleFlag />
              </View>
            : null}
          {flags.includes("UPDATED")
            ? <View style={styles.ArticleFlagContainer}>
                <UpdatedArticleFlag />
              </View>
            : null}
          {flags.includes("EXCLUSIVE")
            ? <View style={styles.ArticleFlagContainer}>
                <ExclusiveArticleFlag />
              </View>
            : null}
          {flags.includes("SPONSORED")
            ? <View style={styles.ArticleFlagContainer}>
                <SponsoredArticleFlag />
              </View>
            : null}
        </View>
      : null}
  </View>;

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
