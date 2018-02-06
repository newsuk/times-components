import React from "react";
import { StyleSheet, View } from "react-native";
import Slice from "@times-components/slice";
import RelatedArticlesHeading from "./heading";
import RelatedArticleItem from "./related-article-item";
import { relatedArticlesPropTypes, defaultProps } from "./proptypes";
import {
  StyledSeparator,
  RelatedArticleContainer,
  ImageContainer,
  SummaryContainer
} from "./styles/responsive";

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100%"
  }
});

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles) return null;

  const articleCount = articles.length;
  const StyledRelatedArticleContainer = RelatedArticleContainer(articleCount);
  const StyledImageContainer = ImageContainer(articleCount);
  const StyledSummaryContainer = SummaryContainer(articleCount);

  return (
    <View style={styles.container}>
      <RelatedArticlesHeading />
      <Slice template={template}>
        {articles.map((article, index) => {
          const hasBorder = articleCount > 1 && index > 0;
          const hasPadding = index < articleCount - 1;
          const paddingStyle = { paddingRight: hasPadding ? "10px" : "" };
          return (
            <View key={article.id} style={[styles.itemContainer, paddingStyle]}>
              {hasBorder ? <StyledSeparator /> : null}
              <RelatedArticleItem
                article={article}
                onPress={onPress}
                styledRelatedArticleContainer={StyledRelatedArticleContainer}
                styledImageContainer={StyledImageContainer}
                styledSummaryContainer={StyledSummaryContainer}
              />
            </View>
          );
        })}
      </Slice>
    </View>
  );
};

RelatedArticles.propTypes = relatedArticlesPropTypes;
RelatedArticles.defaultProps = defaultProps;

export default RelatedArticles;
