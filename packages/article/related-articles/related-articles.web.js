import React from "react";
import { View } from "react-native";
import renderSlice from "./related-articles.base";
import RelatedArticlesHeading from "./related-articles-heading";
import RelatedArticleItem from "./related-article-item";
import {
  relatedArticlesPropTypes,
  relatedArticlesDefaultProps
} from "./related-articles-proptypes";
import withTrackingContext from "./related-articles-tracking-context";
import {
  getHeadlineContainer,
  getImageContainer,
  getRelatedArticleContainer,
  getSummaryContainer
} from "./styles/responsive";

const RelatedArticles = ({ articles, onPress, template }) => {
  if (!articles || articles.length === 0) return null;

  const articleCount = articles.length;
  const RelatedArticleContainer = getRelatedArticleContainer({ articleCount });
  const SummaryContainer = getSummaryContainer({ articleCount });

  const renderArticleItems = () =>
    articles.map((article, index) => {
      const isLead = template === "LEAD_AND_TWO" && index === 0;
      const isSupport = template === "LEAD_AND_TWO" && index > 0;
      const isDefault = template === "DEFAULT";

      const ImageContainer = getImageContainer({
        articleCount,
        hasManyDefaults: isDefault && article >= 3,
        isSupport
      });
      const HeadlineContainer = getHeadlineContainer({ isSupport });
      const showSummaryContent = isDefault || isLead;

      return (
        <RelatedArticleItem
          article={article}
          headlineContainer={HeadlineContainer}
          imageContainer={ImageContainer}
          key={article.id}
          onPress={onPress}
          relatedArticleContainer={RelatedArticleContainer}
          showSummaryContent={showSummaryContent}
          summaryContainer={SummaryContainer}
        />
      );
    });

  return (
    <View style={{ marginTop: 10 }}>
      <RelatedArticlesHeading />
      {renderSlice(template, renderArticleItems)}
    </View>
  );
};

RelatedArticles.propTypes = relatedArticlesPropTypes;
RelatedArticles.defaultProps = relatedArticlesDefaultProps;

export default withTrackingContext(RelatedArticles);
