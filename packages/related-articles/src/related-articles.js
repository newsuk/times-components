import React from "react";
import { View } from "react-native";
import {
  StandardSlice,
  LeadOneAndTwoSlice,
  OpinionOneAndTwoSlice
} from "@times-components/slice";
import RelatedArticlesHeading from "./related-articles-heading";
import RelatedArticleItem from "./related-article-item";
import propTypes from "./related-articles-prop-types";
import withTrackingContext from "./related-articles-tracking-context";

const RelatedArticles = ({ onPress, slice }) => {
  const { items, lead, opinion, sliceName, support1, support2 } = slice;

  if (!sliceName || (!items && !lead && !opinion)) return null;

  const renderArticleItem = (config, article) => {
    const {
      bylineClass = "",
      contentContainerClass,
      headlineClass = "",
      imageConfig = {},
      imageContainerClass,
      isOpinionByline = false,
      isReversed = false,
      showImage = true,
      showSummary = true,
      summaryConfig = {}
    } = config;
    return (
      <RelatedArticleItem
        article={article}
        bylineClass={bylineClass}
        contentContainerClass={contentContainerClass}
        headlineClass={headlineClass}
        id={article.id}
        imageConfig={imageConfig}
        imageContainerClass={imageContainerClass}
        isOpinionByline={isOpinionByline}
        isReversed={isReversed}
        onPress={onPress}
        showImage={showImage}
        showSummary={showSummary}
        summaryConfig={summaryConfig}
      />
    );
  };

  const renderSlice = () => {
    switch (sliceName) {
      case "StandardSlice":
      default:
        return (
          <StandardSlice
            itemCount={items.length}
            renderItems={config =>
              items.map(item => renderArticleItem(config, item.article))
            }
          />
        );
      case "LeadOneAndTwoSlice":
        return (
          <LeadOneAndTwoSlice
            renderLead={config => renderArticleItem(config, lead.article)}
            renderSupport1={config => {
              if (!support1) return null;
              return renderArticleItem(config, support1.article);
            }}
            renderSupport2={config => {
              if (!support2) return null;
              return renderArticleItem(config, support2.article);
            }}
          />
        );
      case "OpinionOneAndTwoSlice":
        return (
          <OpinionOneAndTwoSlice
            renderOpinion={config => renderArticleItem(config, opinion.article)}
            renderSupport1={config => {
              if (!support1) return null;
              return renderArticleItem(config, support1.article);
            }}
            renderSupport2={config => {
              if (!support2) return null;
              return renderArticleItem(config, support2.article);
            }}
          />
        );
    }
  };

  return (
    <View>
      <RelatedArticlesHeading />
      {renderSlice()}
    </View>
  );
};

RelatedArticles.propTypes = propTypes;

export default withTrackingContext(RelatedArticles);
