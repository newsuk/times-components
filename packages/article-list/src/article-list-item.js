import React from "react";
import { View } from "react-native";
import ArticleSummary, {
  ArticleSummaryHeadline,
  ArticleSummaryContent
} from "@times-components/article-summary";
import Card from "@times-components/card";
import Link from "@times-components/link";
import { colours } from "@times-components/styleguide";
import articleListItemTrackingEvents from "./article-list-item-tracking-events";
import { propTypes, defaultProps } from "./article-list-item-prop-types";
import getImageUri from "./utils";
import styles from "./styles";

const ArticleListItem = props => {
  const {
    headline,
    imageRatio,
    isLoading,
    label,
    onPress,
    publicationName,
    publishedTime,
    shortSummary,
    showImage,
    summary,
    url
  } = props;

  const imageUri = getImageUri(props);

  if (isLoading) {
    return (
      <View style={styles.listItemContainer}>
        <Card
          imageRatio={imageRatio}
          isLoading={isLoading}
          showImage={showImage}
        />
      </View>
    );
  }

  const content = showImage ? summary : shortSummary;

  return (
    <Link onPress={onPress} url={url}>
      <View style={styles.listItemContainer}>
        <Card
          image={imageUri ? { uri: imageUri } : null}
          imageRatio={imageRatio}
          showImage={showImage}
        >
          <ArticleSummary
            content={() => <ArticleSummaryContent ast={content} />}
            datePublicationProps={{
              date: publishedTime,
              publication: publicationName
            }}
            headline={() => <ArticleSummaryHeadline headline={headline} />}
            labelProps={{
              color: colours.functional.primary,
              title: label
            }}
          />
        </Card>
      </View>
    </Link>
  );
};

ArticleListItem.propTypes = propTypes;
ArticleListItem.defaultProps = defaultProps;

export default articleListItemTrackingEvents(ArticleListItem);
