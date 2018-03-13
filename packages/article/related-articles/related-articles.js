import React from "react";
import { View } from "react-native";
import { DefaultSlice, LeadSlice } from "@times-components/slice";
import RelatedArticlesHeading from "./related-articles-heading";
import RelatedArticleItem from "./related-article-item";
import {
  relatedArticlesPropTypes,
  relatedArticlesDefaultProps
} from "./related-articles-proptypes";
import withTrackingContext from "./related-articles-tracking-context";

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles || articles.length === 0) return null;

  const articleCount = articles.length;

  const renderArticleItems = (articleItems, config) => {
    const {
      contentContainerClass = "",
      headlineClass = "",
      imageContainerClass = "",
      summaryClass = "",
      showImage = true,
      showSummary = true
    } = config;
    return articleItems.map(articleItem => (
      <RelatedArticleItem
        article={articleItem}
        contentContainerClass={contentContainerClass}
        headlineClass={headlineClass}
        imageContainerClass={imageContainerClass}
        key={articleItem.id}
        onPress={onPress}
        showImage={showImage}
        showSummary={showSummary}
        summaryClass={summaryClass}
      />
    ));
  };

  const renderSlice = () => {
    switch (template) {
      case "DEFAULT":
      default:
        return (
          <DefaultSlice
            itemCount={articleCount}
            renderItems={(config = {}) => renderArticleItems(articles, config)}
          />
        );
      case "LEAD_AND_TWO":
        return (
          <LeadSlice
            lead={(config = {}) => renderArticleItems([articles[0]], config)}
            support1={(config = {}) => {
              const article = articles[1];
              return article ? renderArticleItems([article], config) : null;
            }}
            support2={(config = {}) => {
              const article = articles[2];
              return article ? renderArticleItems([article], config) : null;
            }}
          />
        );
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      <RelatedArticlesHeading />
      {renderSlice()}
    </View>
  );
};

RelatedArticles.propTypes = relatedArticlesPropTypes;
RelatedArticles.defaultProps = relatedArticlesDefaultProps;

export default withTrackingContext(RelatedArticles);
