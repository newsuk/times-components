import React from "react";
import { View } from "react-native";
import {
  StandardSlice,
  LeadAndTwoSlice,
  OpinionAndTwoSlice
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
    const main = lead || opinion || {};
    const { article } = main;
    const supports = [support1, support2];

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
          <LeadAndTwoSlice
            lead={config => renderArticleItem(config, article)}
            renderSupports={config =>
              supports
                .filter(support => support !== undefined)
                .map(support => renderArticleItem(config, support.article))
            }
          />
        );
      case "OpinionOneAndTwoSlice":
        return (
          <OpinionAndTwoSlice
            opinion={config => renderArticleItem(config, article)}
            renderSupports={config =>
              supports
                .filter(support => support !== undefined)
                .map(support => renderArticleItem(config, support.article))
            }
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
