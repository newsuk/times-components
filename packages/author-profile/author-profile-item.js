import React from "react";
import get from "lodash.get";
import { StyleSheet, View, Text } from "react-native";
import Card from "@times-components/card";
import Link from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";

import ArticleLabel from "@times-components/article-label";
import DatePublication from "@times-components/date-publication";
import ArticleSummary, {
  ArticleSummaryHeadline,
  renderAst
} from "@times-components/article-summary";

const renderAst = ast => renderTrees(summarise(ast), renderer);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    paddingTop: 15
  }
});

const AuthorProfileItem = item => {
  const {
    style,
    summary,
    shortSummary,
    label,
    isLoading,
    onPress,
    publicationName,
    publishedTime,
    headline,
    url,
    imageRatio,
    imageSize,
    showImage
  } = item;

  const imageUri = get(
    item,
    "leadAsset.crop.url",
    get(item, "leadAsset.posterImage.crop.url", null)
  );

  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <Card
          isLoading={isLoading}
          imageRatio={imageRatio}
          showImage={showImage}
        />
      </View>
    );
  }

  const summaryText = showImage ? summary : shortSummary;
  const Label = label
    ? () => <ArticleLabel title={label} color="#333333" />
    : null;

  return (
    <Link url={url} onPress={onPress}>
      <View style={[styles.container, style]}>
        <Card
          image={imageUri ? { uri: imageUri } : null}
          imageRatio={imageRatio}
          imageSize={imageSize}
          showImage={showImage}
        >
          <ArticleSummary
            Label={() => label? <ArticleLabel title={label} color="#333333" /> : null}
            Headline={() => <ArticleSummaryHeadline headline={headline} />}
            textAst={() => renderAst(summaryText)}
            DatePublication={() => (
              <DatePublication
                date={publishedTime}
                publication={publicationName}
              />
            )}
          />
        </Card>
      </View>
    </Link>
  );
};

export default withTrackEvents(AuthorProfileItem, {
  analyticsEvents: [
    {
      eventName: "onPress",
      actionName: "Pressed",
      getAttrs: ({ headline, id }) => ({
        articleHeadline: headline,
        articleId: id
      })
    }
  ]
});
