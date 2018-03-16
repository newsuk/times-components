import React from "react";
import { View } from "react-native";
import { StandardSlice, LeadAndTwoSlice } from "@times-components/slice";
import RelatedArticlesHeading from "./related-articles-heading";
import RelatedArticleItem from "./related-article-item";
import {
  relatedArticlesPropTypes,
  relatedArticlesDefaultProps
} from "./related-articles-proptypes";
import withTrackingContext from "./related-articles-tracking-context";

const RelatedArticles = ({ articles, leadId, onPress, template }) => {
  if (!articles || articles.length === 0) return null;

  const articleCount = articles.length;

  const renderArticleItem = (config, article) => {
    const {
      contentContainerClass = "",
      headlineClass = "",
      imageContainerClass = "",
      showImage = true,
      showSummary = true,
      summaryConfig = {}
    } = config;
    return (
      <RelatedArticleItem
        article={article}
        contentContainerClass={contentContainerClass}
        headlineClass={headlineClass}
        id={article.id}
        imageContainerClass={imageContainerClass}
        onPress={e => onPress(e, { url: article.url })}
        showImage={showImage}
        showSummary={showSummary}
        summaryConfig={summaryConfig}
      />
    );
  };

  const renderSlice = () => {
    const lead = articles.find(article => article.id === leadId);
    const supports = articles.filter(article => article.id !== leadId);

    switch (template) {
      case "DEFAULT":
      default:
        return (
          <StandardSlice
            itemCount={articleCount}
            renderItems={(config = {}) =>
              articles.map(article => renderArticleItem(config, article))
            }
          />
        );
      case "LEAD_AND_TWO":
        return (
          <LeadAndTwoSlice
            lead={(config = {}) => renderArticleItem(config, lead)}
            renderSupports={(config = {}) =>
              supports.map(article => renderArticleItem(config, article))
            }
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
