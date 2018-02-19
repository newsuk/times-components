import React from "react";
import { View } from "react-native";
import Slice from "@times-components/slice";
import getTemplateName from "@times-components/slice/styles/template-map";
import RelatedArticlesHeading from "./heading";
import RelatedArticleItem from "./related-article-item";
import { relatedArticlesPropTypes, defaultProps } from "./proptypes";
import getStyledComponent from "./styles/responsive";

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles || articles.length === 0) return null;

  const articleCount = articles.length;

  const templateName = getTemplateName(template);

  const RelatedArticleContainer = getStyledComponent(
    View,
    templateName,
    "RelatedArticleContainer",
    { articleCount }
  );
  const SummaryContainer = getStyledComponent(
    View,
    templateName,
    "SummaryContainer",
    { articleCount }
  );

  const renderArticleItems = () =>
    articles.map((article, index) => {
      const ImageContainer = getStyledComponent(
        View,
        templateName,
        "ImageContainer",
        { articleCount, isLead: index === 0 }
      );
      return (
        <RelatedArticleItem
          article={article}
          key={article.id}
          onPress={onPress}
          relatedArticleContainer={RelatedArticleContainer}
          imageContainer={ImageContainer}
          summaryContainer={SummaryContainer}
          template={template}
        />
      );
    });

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
