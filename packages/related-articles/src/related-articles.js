import React from "react";
import { View } from "react-native";
import {
  StandardSlice,
  LeadAndTwoSlice,
  OpinionAndTwoSlice
} from "@times-components/slice";
import RelatedArticlesHeading from "./related-articles-heading";
import RelatedArticleItem from "./related-article-item";
import {
  relatedArticlesPropTypes,
  relatedArticlesDefaultProps
} from "./related-articles-prop-types";
import withTrackingContext from "./related-articles-tracking-context";

const RelatedArticles = ({
  lead,
  onPress,
  opinion,
  sliceName,
  standardArticles,
  supports
}) => {
  if (!sliceName) return null;

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
    const mainArticle = lead || opinion;

    switch (sliceName) {
      case "StandardSlice":
      default:
        return (
          <StandardSlice
            itemCount={standardArticles.length}
            renderItems={config =>
              standardArticles.map(article =>
                renderArticleItem(config, article)
              )
            }
          />
        );
      case "LeadOneAndTwoSlice":
        return (
          <LeadAndTwoSlice
            lead={config => renderArticleItem(config, mainArticle)}
            renderSupports={config =>
              supports
                .filter(support => support !== undefined)
                .map(article => renderArticleItem(config, article))
            }
          />
        );
      case "OpinionOneAndTwoSlice":
        return (
          <OpinionAndTwoSlice
            opinion={config => renderArticleItem(config, mainArticle)}
            renderSupports={config =>
              supports
                .filter(support => support !== undefined)
                .map(article => renderArticleItem(config, article))
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

RelatedArticles.propTypes = relatedArticlesPropTypes;
RelatedArticles.defaultProps = relatedArticlesDefaultProps;

export default withTrackingContext(RelatedArticles);
