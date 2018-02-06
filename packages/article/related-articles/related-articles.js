import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Slice from "@times-components/slice";
import getTemplateObject from "./config";
import RelatedArticlesHeading from "./heading";
import RelatedArticleItem from "./related-article-item";
import { relatedArticlesPropTypes, defaultProps } from "./proptypes";

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  }
});

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles) return null;
  const templateObject = getTemplateObject(template);

  return (
    <ScrollView style={styles.container}>
      <RelatedArticlesHeading />
      <Slice template={templateObject}>
        {articles.map(article => (
          <RelatedArticleItem
            key={article.id}
            article={article}
            onPress={onPress}
          />
        ))}
      </Slice>
    </ScrollView>
  );
};

RelatedArticles.propTypes = relatedArticlesPropTypes;
RelatedArticles.defaultProps = defaultProps;

export default RelatedArticles;
