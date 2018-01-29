import React, { Fragment } from "react";
import get from "lodash.get";
import { StyleSheet, View } from "react-native";
import Card from "@times-components/card";
import Link from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";
import withResponsiveStyles from "@times-components/responsive-styles";
import ArticleSummary from "@times-components/article-summary";

const LongText = withResponsiveStyles(View, {
  base: () => "display: none;",
  mediumUp: () => "display: block;"
});

const ShortText = withResponsiveStyles(View, {
  base: () => "display: block;",
  mediumUp: () => "display: none;"
});

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
    longSummary,
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

  const childProps = {
    label,
    headline,
    date: publishedTime,
    publication: publicationName
  };

  const children = showImage ? (
    <ArticleSummary {...childProps} text={summary} />
  ) : (
    <Fragment>
      <LongText>
        <ArticleSummary {...childProps} text={longSummary} />
      </LongText>
      <ShortText>
        <ArticleSummary {...childProps} text={shortSummary} />
      </ShortText>
    </Fragment>
  );

  return (
    <Link url={url} onPress={onPress}>
      <View style={[styles.container, style]}>
        <Card
          image={imageUri ? { uri: imageUri } : null}
          imageRatio={imageRatio}
          imageSize={imageSize}
          showImage={showImage}
        >
          {children}
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
