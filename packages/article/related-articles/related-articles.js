import React from "react";
import { ScrollView } from "react-native";
import { DefaultSlice, LeadSlice } from "@times-components/slice";
import RelatedArticlesHeading from "./related-articles-heading";
import RelatedArticleItem from "./related-article-item";
import withTrackingContext from "./related-articles-tracking-context";
import {
  relatedArticlesPropTypes,
  relatedArticlesDefaultProps
} from "./related-articles-proptypes";

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles || articles.length === 0) return null;

  const renderArticleItems = () =>
    articles.map(article => (
      <RelatedArticleItem
        article={article}
        key={article.id}
        onPress={onPress}
      />
    ));

  const renderSlice = () => {
    switch (template) {
      case "DEFAULT":
      default:
        return <DefaultSlice>{renderArticleItems()}</DefaultSlice>;
      case "LEAD_AND_TWO":
        return (
          <LeadSlice
            lead={renderArticleItems()[0]}
            support1={renderArticleItems()[1]}
            support2={renderArticleItems()[2]}
          />
        );
    }
  };

  return (
    <ScrollView style={{ marginTop: 10 }}>
      <RelatedArticlesHeading />
      {renderSlice()}
    </ScrollView>
  );
};

RelatedArticles.propTypes = relatedArticlesPropTypes;
RelatedArticles.defaultProps = relatedArticlesDefaultProps;

export default withTrackingContext(RelatedArticles);
