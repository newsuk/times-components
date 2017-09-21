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
  <View style={[styles.articleMainContentRow]}>
    {label
      ? <View style={styles.articleLabel}>
          <ArticleLabel title={label} color="#13354E" />
        </View>
      : null}
    <View style={[styles.articleHeadline]}>
      <ArticleHeadline title={title} style={styles.articleHeadLineText} />
    </View>
    {standfirst
      ? <Text style={[styles.standFirst]}>
          {standfirst}
        </Text>
      : null}
    {flags.length
      ? <View style={[styles.articleFlag]}>
          {flags.includes("NEW")
            ? <View style={styles.articleFlagContainer}>
                <NewArticleFlag />
              </View>
            : null}
          {flags.includes("UPDATED")
            ? <View style={styles.articleFlagContainer}>
                <UpdatedArticleFlag />
              </View>
            : null}
          {flags.includes("EXCLUSIVE")
            ? <View style={styles.articleFlagContainer}>
                <ExclusiveArticleFlag />
              </View>
            : null}
          {flags.includes("SPONSORED")
            ? <View style={styles.articleFlagContainer}>
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
