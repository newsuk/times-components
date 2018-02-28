import React from "react";
import { ScrollView } from "react-native";
// @TODO: use TemplateSlice components
import { Slice } from "@times-components/slice";
import Heading from "./heading";
import RelatedArticleItem from "./related-article-item";
import { relatedArticlesPropTypes, defaultProps } from "./proptypes";
import withTrackingContext from "./related-articles-tracking-context";

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <ScrollView style={{ marginTop: 10 }}>
      <Heading />
      <Slice template={template}>
        {articles.map(article => (
          <RelatedArticleItem
            article={article}
            key={article.id}
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
