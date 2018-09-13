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
import { getImageUri, getHeadline } from "./utils";
import styles from "./styles";

const ArticleListItem = props => {
  const {
    byline,
    headline,
    highResSize,
    imageRatio,
    isLoading,
    label,
    leadAsset,
    onPress,
    publicationName,
    publishedTime,
    section,
    shortHeadline,
    shortSummary,
    showImage,
    summary,
    url
  } = props;

  const imageUri = getImageUri(props);
  const content = showImage ? summary : shortSummary;

  return (
    <Link onPress={onPress} url={url}>
      <View style={styles.listItemContainer}>
        <Card
          highResSize={highResSize}
          imageRatio={imageRatio}
          imageUri={imageUri}
          isLoading={isLoading}
          showImage={showImage}
        >
          <ArticleSummary
            bylineProps={
              byline
                ? {
                    ast: byline,
                    color: colours.section.default
                  }
                : null
            }
            content={() => <ArticleSummaryContent ast={content} />}
            datePublicationProps={{
              date: publishedTime,
              publication: publicationName
            }}
            headline={() => (
              <ArticleSummaryHeadline
                headline={getHeadline(headline, shortHeadline)}
              />
            )}
            labelProps={{
              color: colours.section[section] || colours.section.default,
              isVideo: leadAsset && leadAsset.type === "Video",
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
