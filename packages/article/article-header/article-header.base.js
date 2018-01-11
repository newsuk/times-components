import React from "react";
import PropTypes from "prop-types";
import {
  NewArticleFlag,
  SponsoredArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag
} from "@times-components/article-flag";
import ArticleLabel from "@times-components/article-label";
import { Text, View, ViewPropTypes } from "react-native";
import styles from "../styles/article-header";
import {
  HeadlineContainer,
  LabelContainer
} from "../styles/article-header/responsive.web.js";

const { style: ViewStylePropTypes } = ViewPropTypes;

const flagsMapping = new Map([
  ["NEW", <NewArticleFlag />],
  ["UPDATED", <UpdatedArticleFlag />],
  ["EXCLUSIVE", <ExclusiveArticleFlag />],
  ["SPONSORED", <SponsoredArticleFlag />]
]);

const renderFlags = flags => {
  if (!flags.length) return null;
  return (
    <View style={styles.articleFlag}>
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
    <Text
      accessibilityLabel="standfirst"
      testID="standfirst"
      style={[styles.standFirst]}
    >
      {standfirst}
    </Text>
  );
};

const renderLabel = (label, LabelWrapper) => {
  if (!label) return null;
  return (
    <LabelWrapper
      accessibilityLabel="label"
      testID="label"
      style={styles.articleLabel}
    >
      <ArticleLabel title={label} color="#13354E" />
    </LabelWrapper>
  );
};

const ArticleHeader = ({
  label,
  headline,
  standfirst,
  flags,
  style,
  HeadlineWrapper,
  LabelWrapper
}) => (
  <View style={[...style]}>
    {renderLabel(label, LabelWrapper)}
    <HeadlineWrapper style={styles.articleHeadLineText}>
      {headline}
    </HeadlineWrapper>
    {renderStandfirst(standfirst)}
    {renderFlags(flags)}
  </View>
);

ArticleHeader.propTypes = {
  headline: PropTypes.string.isRequired,
  HeadlineWrapper: PropTypes.oneOf([Text, HeadlineContainer]),
  label: PropTypes.string,
  LabelWrapper: PropTypes.oneOf([View, LabelContainer]),
  standfirst: PropTypes.string,
  flags: PropTypes.arrayOf(PropTypes.string),
  style: ViewStylePropTypes
};

ArticleHeader.defaultProps = {
  HeadlineWrapper: Text,
  label: null,
  LabelWrapper: View,
  standfirst: null,
  flags: [],
  style: {}
};

export default ArticleHeader;
