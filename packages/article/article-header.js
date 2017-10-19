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
import styles from "./styles/article-header-style";

const flagsMapping = new Map([
  ["NEW", <NewArticleFlag />],
  ["UPDATED", <UpdatedArticleFlag />],
  ["EXCLUSIVE", <ExclusiveArticleFlag />],
  ["SPONSORED", <SponsoredArticleFlag />]
]);

const renderFlags = flags => {
  if (!flags.length) return null;
  return (
    <View style={[styles.articleFlag]}>
      {flags.map(flag => (
        <View key={flag} style={styles.articleFlagContainer}>
          {flagsMapping.get(flag)}
        </View>
      ))}
    </View>
  );
};

const renderStandfirst = standfirst => {
  if (!standfirst) return null;
  return (
    <Text accessibilityLabel="standfirst" testID="standfirst" style={[styles.standFirst]}>
      {standfirst}
    </Text>
  );
};

const renderLabel = label => {
  if (!label) return null;
  return (
    <View accessibilityLabel="label" testID="label" style={styles.articleLabel}>
      <ArticleLabel title={label} color="#13354E" />
    </View>
  );
};

const ArticleHeader = ({ label, headline, standfirst, flags }) => (
  <View style={[styles.articleMainContentRow]}>
    {renderLabel(label)}
    <ArticleHeadline text={headline} style={styles.articleHeadLineText} />
    {renderStandfirst(standfirst)}
    {renderFlags(flags)}
  </View>
);

ArticleHeader.propTypes = {
  headline: PropTypes.string.isRequired,
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
