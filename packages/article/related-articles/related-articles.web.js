import React from "react";
import { View } from "react-native";
import Slice from "@times-components/slice";
import RelatedArticlesHeading from "./heading";
import RelatedArticleItem from "./related-article-item";
import { relatedArticlesPropTypes, defaultProps } from "./proptypes";
import {
  RelatedArticleItemContainer,
  StyledSeparator,
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

  const renderArticleItems = () => {
    const articleArray = articles.map((article, index) => {
      const hasPadding = index < articleCount - 1;
      const StyledRelatedArticleItemContainer = RelatedArticleItemContainer(
        hasPadding
      );

      return (
        <StyledRelatedArticleItemContainer
          accessibilityRole="article"
          key={article.id}
        >
          <RelatedArticleItem
            article={article}
            onPress={onPress}
            styledRelatedArticleContainer={StyledRelatedArticleContainer}
            styledImageContainer={StyledImageContainer}
            styledSummaryContainer={StyledSummaryContainer}
          />
        </StyledRelatedArticleItemContainer>
      );
    });

    return articleArray.reduce((previous, current) =>
      [].concat(
        previous,
        <StyledSeparator key={`separator-${current.key}`} />,
        current
      )
    );
  };

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
