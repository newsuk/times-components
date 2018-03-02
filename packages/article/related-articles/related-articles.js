import React from "react";
import { ScrollView } from "react-native";
// @TODO: use TemplateSlice components
import { Slice } from "@times-components/slice";
import RelatedArticlesHeading from "./heading";
import RelatedArticleItem from "./related-article-item";
import { relatedArticlesPropTypes, defaultProps } from "./proptypes";
import withTrackingContext from "./related-articles-tracking-context";

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <ScrollView style={{ marginTop: 10 }}>
      <RelatedArticlesHeading />
      <Slice template={template}>
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

export default withTrackingContext(RelatedArticles);
