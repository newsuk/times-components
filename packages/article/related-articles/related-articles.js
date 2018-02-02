import React from "react";
import { StyleSheet, View } from "react-native";
import Slice from "@times-components/slice";
import RelatedArticlesHeading from "./heading";
import RelatedArticleItem from "./related-article-item";
import { propTypes, defaultProps } from "./proptypes";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
});

// borderBottomColor: "red",
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderStyle: "solid"

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles) return null;
  return (
    <View style={styles.container}>
      <RelatedArticlesHeading />
      <Slice template={template}>
        {articles.map(article => (
          <RelatedArticleItem
            key={article.id}
            article={article}
            articleCount={articles.length}
            onPress={onPress}
          />
        ))}
      </Slice>
    </View>
  );
};

RelatedArticles.propTypes = propTypes;
RelatedArticles.defaultProps = defaultProps;

export default RelatedArticles;
