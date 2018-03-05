import React from "react";
import { ScrollView } from "react-native";
import renderSlice from "./related-articles.base";
import RelatedArticlesHeading from "./related-articles-heading";
import RelatedArticleItem from "./related-article-item";
import {
  relatedArticlesPropTypes,
  relatedArticlesDefaultProps
} from "./related-articles-proptypes";
import withTrackingContext from "./related-articles-tracking-context";

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles || articles.length === 0) return null;

  const renderArticleItems = () =>
    articles.map((article, index) => {
      const hideImage =
        (template === "DEFAULT" && articles.length === 3) ||
        (template === "LEAD_AND_TWO" && index > 0);
      const hideSummaryContent = template === "LEAD_AND_TWO" && index > 0;

      return (
        <RelatedArticleItem
          article={article}
          hideImage={hideImage}
          hideSummaryContent={hideSummaryContent}
          key={article.id}
          onPress={onPress}
        />
      );
    });

  return (
    <ScrollView style={{ marginTop: 10 }}>
      <RelatedArticlesHeading />
      {renderSlice(template, renderArticleItems)}
    </ScrollView>
  );
};

RelatedArticles.propTypes = relatedArticlesPropTypes;
RelatedArticles.defaultProps = relatedArticlesDefaultProps;

export default withTrackingContext(RelatedArticles);
