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
      const isDefault = template === "DEFAULT";
      const isLead = template === "LEAD_AND_TWO" && index === 0;

      const showImage = (isDefault && articles.length < 3) || isLead;
      const showSummaryContent = isDefault || isLead;

      return (
        <RelatedArticleItem
          article={article}
          key={article.id}
          onPress={onPress}
          showImage={showImage}
          showSummaryContent={showSummaryContent}
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
