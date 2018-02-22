import React from "react";
import { View } from "react-native";
// @TODO: use TemplateSlice components
import { Slice } from "@times-components/slice";
import RelatedArticlesHeading from "./heading";
import RelatedArticleItem from "./related-article-item";
import { relatedArticlesPropTypes, defaultProps } from "./proptypes";
import {
  RelatedArticleContainer,
  ImageContainer,
  SummaryContainer
} from "./styles/responsive";

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles || articles.length === 0) return null;

  const articleCount = articles.length;
  const StyledRelatedArticleContainer = RelatedArticleContainer(articleCount);
  const StyledImageContainer = ImageContainer(articleCount);
  const StyledSummaryContainer = SummaryContainer(articleCount);

  const renderArticleItems = () =>
    articles.map(article => (
      <RelatedArticleItem
        article={article}
        key={article.id}
        onPress={onPress}
        styledRelatedArticleContainer={StyledRelatedArticleContainer}
        styledImageContainer={StyledImageContainer}
        styledSummaryContainer={StyledSummaryContainer}
      />
    ));

  return (
    <View style={{ marginTop: 10 }}>
      <RelatedArticlesHeading />
      <Slice template={template}>{renderArticleItems()}</Slice>
    </View>
  );
};

RelatedArticles.propTypes = relatedArticlesPropTypes;
RelatedArticles.defaultProps = defaultProps;

export default RelatedArticles;
