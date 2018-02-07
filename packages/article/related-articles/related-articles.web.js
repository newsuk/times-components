import React from "react";
import { StyleSheet, View } from "react-native";
import Slice from "@times-components/slice";
import getTemplateObject from "./config";
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

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  }
});

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles) return null;

  const templateObject = getTemplateObject(template);

  const articleCount = articles.length;
  const StyledRelatedArticleContainer = RelatedArticleContainer(articleCount);
  const StyledImageContainer = ImageContainer(articleCount);
  const StyledSummaryContainer = SummaryContainer(articleCount);

  const renderArticleItems = () => {
    const myArray = [];
    articles.map((article, index) => {
      const hasBorder = articleCount > 1 && index > 0;
      const hasPadding = index < articleCount - 1;
      const paddingStyle = { paddingRight: hasPadding ? "10px" : "" };
      const StyledRelatedArticleItemContainer = RelatedArticleItemContainer(hasPadding);

      if (hasBorder) {
        myArray.push(<StyledSeparator key={`separator-${article.id}`} />);
      }
      myArray.push(
        <StyledRelatedArticleItemContainer
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
      return true;
    });

    return myArray;
  };

  return (
    <View style={styles.container}>
      <RelatedArticlesHeading />
      <Slice template={templateObject}>{renderArticleItems()}</Slice>
    </View>
  );
};

RelatedArticles.propTypes = relatedArticlesPropTypes;
RelatedArticles.defaultProps = defaultProps;

export default RelatedArticles;
