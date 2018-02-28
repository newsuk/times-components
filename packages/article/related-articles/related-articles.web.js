import React from "react";
import { View } from "react-native";
import RelatedArticlesHeading from "./related-articles-heading";
import RelatedArticleItem from "./related-article-item";
import {
  relatedArticlesPropTypes,
  relatedArticlesDefaultProps
} from "./related-articles-proptypes";
import {
  getImageContainer,
  getRelatedArticleContainer,
  getSummaryContainer
} from "./styles/responsive";
import getSliceComponent from "./utils";

import withTrackingContext from "./related-articles-tracking-context";

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles || articles.length === 0) return null;

  const articleCount = articles.length;
  const ImageContainer = getImageContainer(articleCount);
  const RelatedArticleContainer = getRelatedArticleContainer(articleCount);
  const SummaryContainer = getSummaryContainer(articleCount);

  const Slice = getSliceComponent(template);

  // for tests
  ImageContainer.displayName = "ImageContainer";
  RelatedArticleContainer.displayName = "RelatedArticleContainer";
  SummaryContainer.displayName = "SummaryContainer";

  const renderArticleItems = () =>
    articles.map(article => (
      <RelatedArticleItem
        article={article}
        key={article.id}
        onPress={onPress}
        imageContainer={ImageContainer}
        relatedArticleContainer={RelatedArticleContainer}
        summaryContainer={SummaryContainer}
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
RelatedArticles.defaultProps = relatedArticlesDefaultProps;

export default withTrackingContext(RelatedArticles);
