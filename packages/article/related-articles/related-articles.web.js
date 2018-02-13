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
    const myArray = [];
    articles.map((article, index) => {
      const hasBorder = articleCount > 1 && index > 0;
      const hasPadding = index < articleCount - 1;
      const StyledRelatedArticleItemContainer = RelatedArticleItemContainer(
        hasPadding
      );

      if (hasBorder) {
        myArray.push(<StyledSeparator key={`separator-${article.id}`} />);
      }
      myArray.push(
        <StyledRelatedArticleItemContainer key={article.id}>
          <RelatedArticleItem
            article={article}
            onPress={onPress}
            styledRelatedArticleContainer={StyledRelatedArticleContainer}
            styledImageContainer={StyledImageContainer}
            styledSummaryContainer={StyledSummaryContainer}
          />
        </StyledRelatedArticleItemContainer>
      );
      return true;
    });

    return myArray;
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
