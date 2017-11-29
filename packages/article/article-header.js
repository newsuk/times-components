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
import { Text, View, ViewPropTypes } from "react-native";
import styles from "./styles/header";
import {
  HeadlineContainer,
  LabelContainer,
  FlagContainer
} from "./styles/body/responsive";

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
    <FlagContainer style={[styles.articleFlag]}>
      {flags.map(flag => (
        <View key={flag} style={styles.articleFlagContainer}>
          {flagsMapping.get(flag)}
        </View>
      ))}
    </FlagContainer>
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

const renderLabel = label => {
  if (!label) return null;
  return (
    <LabelContainer
      accessibilityLabel="label"
      testID="label"
      style={styles.articleLabel}
    >
      <ArticleLabel title={label} color="#13354E" />
    </LabelContainer>
  );
};

const ArticleHeader = ({ label, headline, standfirst, flags, style }) => (
  <View style={[...style]}>
    {renderLabel(label)}
    <ArticleHeadline
      text={headline}
      style={styles.articleHeadLineText}
      WrapperComponent={HeadlineContainer}
    />
    {renderStandfirst(standfirst)}
    {renderFlags(flags)}
  </View>
);

ArticleHeader.propTypes = {
  headline: PropTypes.string.isRequired,
  label: PropTypes.string,
  standfirst: PropTypes.string,
  flags: PropTypes.arrayOf(PropTypes.string),
  style: ViewStylePropTypes
};

ArticleHeader.defaultProps = {
  label: null,
  standfirst: null,
  flags: [],
  style: {}
};

export default ArticleHeader;
