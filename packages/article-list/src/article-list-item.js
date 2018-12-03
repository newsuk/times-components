import React, { Component } from "react";
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

class ArticleListItem extends Component {
  constructor(props) {
    super(props);
    this.onItemPress = this.onItemPress.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { article } = this.props;
    const { article: nextArticle } = nextProps;
    return (
      !article || !nextArticle || nextArticle.elementId !== article.elementId
    );
  }

  onItemPress(event) {
    const {
      article: { id, url },
      onPress
    } = this.props;
    onPress(event, { id, url });
  }

  render() {
    const {
      article,
      highResSize,
      imageRatio,
      isLoading,
      showImage
    } = this.props;

    const {
      byline,
      headline,
      hasVideo,
      label,
      publicationName,
      publishedTime,
      section,
      shortHeadline,
      shortSummary,
      summary,
      url
    } = article || {};

    const imageUri = getImageUri(article);
    const content = showImage ? summary : shortSummary;

    return (
      <Link onPress={this.onItemPress} url={url}>
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
                isVideo: hasVideo,
                title: label
              }}
            />
          </Card>
        </View>
      </Link>
    );
  }
}

ArticleListItem.propTypes = propTypes;
ArticleListItem.defaultProps = defaultProps;

export default articleListItemTrackingEvents(ArticleListItem);
