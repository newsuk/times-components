import React from "react";
import { ScrollView } from "react-native";
import RelatedArticlesHeading from "./related-articles-heading";
import RelatedArticleItem from "./related-article-item";
import withTrackingContext from "./related-articles-tracking-context";
import {
  relatedArticlesPropTypes,
  relatedArticlesDefaultProps
} from "./related-articles-proptypes";
import getSliceComponent from "./utils";

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles || articles.length === 0) return null;

  const Slice = getSliceComponent(template);

  return (
    <ScrollView style={{ marginTop: 10 }}>
      <RelatedArticlesHeading />
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
RelatedArticles.defaultProps = relatedArticlesDefaultProps;

export default withTrackingContext(RelatedArticles);
