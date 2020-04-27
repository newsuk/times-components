import React, { Component } from "react";
import { View } from "react-native";
import { StandardSlice } from "@times-components/slice-layout";
import RelatedArticlesHeading from "./related-articles-heading";
import RelatedArticleItem from "./related-article-item";
import propTypes from "./related-articles-prop-types";
import withTrackingContext from "./related-articles-tracking-context";

class RelatedArticles extends Component {
  shouldComponentUpdate(nextProps) {
    const { isVisible } = this.props;
    return nextProps.isVisible !== isVisible;
  }

  render() {
    const { isVisible, onPress, slice } = this.props;
    if (!slice) return null;
    const { items } = slice;
    if (!items) return null;

    const renderArticleItem = (config, article, leadAssetOverride) => {
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
          imageConfig={{ ...imageConfig, showHiRes: isVisible }}
          imageContainerClass={imageContainerClass}
          isOpinionByline={isOpinionByline}
          isReversed={isReversed}
          key={article.id}
          leadAssetOverride={leadAssetOverride}
          onPress={onPress}
          showImage={showImage}
          showSummary={showSummary}
          summaryConfig={summaryConfig}
        />
      );
    };

    return (
      <View>
        <RelatedArticlesHeading />
        <StandardSlice
          itemCount={items.length}
          renderItems={config =>
            items.map(item =>
              renderArticleItem(config, item.article, item.leadAsset)
            )
          }
        />
      </View>
    );
  }
}

RelatedArticles.propTypes = propTypes;

export default withTrackingContext(RelatedArticles);
