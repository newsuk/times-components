import React from "react";
import { View } from "react-native";
// @TODO: use TemplateSlice components
import { Slice } from "@times-components/slice";
import Heading from "./heading";
import RelatedArticleItem from "./related-article-item";
import {
  relatedArticlesPropTypes,
  relatedArticlesDefaultProps
} from "./related-articles-proptypes";
import {
  RelatedArticleContainer,
  ImageContainer,
  SummaryContainer
} from "./styles/responsive";

import withTrackingContext from "./related-articles-tracking-context";

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
        styledImageContainer={StyledImageContainer}
        styledRelatedArticleContainer={StyledRelatedArticleContainer}
        styledSummaryContainer={StyledSummaryContainer}
      />
    ));

  return (
    <View style={{ marginTop: 10 }}>
      <Heading />
      <Slice template={template}>{renderArticleItems()}</Slice>
    </View>
  );
};

RelatedArticles.propTypes = relatedArticlesPropTypes;
RelatedArticles.defaultProps = relatedArticlesDefaultProps;

export default withTrackingContext(RelatedArticles);
