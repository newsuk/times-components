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
//import { Text, View } from "react-native";
import styles from "./styles/header";
import { StandFirst, ArticleLabelWrapper, ArticleFlag, ArticleFlagContainer, ArticleMainContentRow} from "./styles/header/styled-components";

const flagsMapping = new Map([
  ["NEW", <NewArticleFlag />],
  ["UPDATED", <UpdatedArticleFlag />],
  ["EXCLUSIVE", <ExclusiveArticleFlag />],
  ["SPONSORED", <SponsoredArticleFlag />]
]);

const renderFlags = flags => {
  if (!flags.length) return null;
  return (
    <ArticleFlag>
      {flags.map(flag => (
        <ArticleFlagContainer key={flag}>
            {flagsMapping.get(flag)}
        </ArticleFlagContainer>
      ))}
    </ArticleFlag>
  );
};

const renderStandfirst = standfirst => {
  if (!standfirst) return null;
  return (
        <StandFirst testID="standfirst">
          {standfirst}
        </StandFirst>

  );
};

const renderLabel = label => {
  if (!label) return null;
  return (
      <ArticleLabelWrapper testID="label">
        <ArticleLabel title={label} color="#13354E" />
      </ArticleLabelWrapper>
  );
};

const ArticleHeader = ({ label, headline, standfirst, flags }) => (
  <ArticleMainContentRow>
    {renderLabel(label)}
    <ArticleHeadline text={headline} style={styles.articleHeadLineText} />
    {renderStandfirst(standfirst)}
    {renderFlags(flags)}
  </ArticleMainContentRow>
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
