import React, { Component } from "react";
import { View } from "react-native";
import get from "lodash.get";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline
} from "@times-components/article-summary";
import Card from "@times-components/card";
import { colours } from "@times-components/styleguide";
import {
  relatedArticleItemPropTypes,
  relatedArticleItemDefaultProps
} from "./related-article-item-prop-types";
import styles from "./styles";
import getHeadline from "./utils";

class RelatedArticleItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highResSize: null
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.imageConfig.showHiRes !== this.props.imageConfig.showHiRes &&
      this.props.imageConfig.showHiRes
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        highResSize: this.node.clientWidth
      });
    }
  }

  render() {
    const {
      article: {
        byline,
        hasVideo,
        headline,
        label,
        leadAsset,
        publishedTime,
        section,
        shortHeadline
      },
      bylineClass,
      children,
      contentContainerClass,
      headlineClass,
      imageConfig: {
        cropSize = "169",
        imageRatio = 16 / 9,
        style: imageStyle = {}
      },
      imageContainerClass,
      isOpinionByline,
      isReversed,
      onPress,
      showImage,
      showSummary,
      summaryConfig: {
        lengths: summaryLengths = [],
        style: summaryStyle = {},
        type: summaryType
      }
    } = this.props;

    const imageUri =
      leadAsset && leadAsset.posterImage
        ? get(leadAsset, `posterImage.crop${cropSize}.url`)
        : get(leadAsset, `crop${cropSize}.url`);

    return children({
      article: this.props.article,
      card: (
        <div
          ref={node => {
            this.node = node;
          }}
        >
          <Card
            contentContainerClass={contentContainerClass}
            highResSize={this.state.highResSize}
            imageContainerClass={imageContainerClass}
            imageRatio={imageRatio}
            imageStyle={imageStyle}
            imageUri={imageUri}
            isReversed={isReversed}
            lowResSize={100}
            showImage={showImage}
          >
            <ArticleSummary
              bylineProps={{
                ast: byline,
                bylineClass,
                bylineStyle: isOpinionByline
                  ? styles.opinionByline
                  : styles.byline,
                color: colours.section[section] || colours.section.default,
                isOpinionByline
              }}
              content={() =>
                showSummary && (
                  <View style={summaryStyle}>
                    {summaryLengths.map(item => {
                      const summaryClassSuffix = `${item}Class`;
                      const summaryClass = summaryType
                        ? `${summaryType}Summary`
                        : `summary`;
                      return (
                        <ArticleSummaryContent
                          ast={this.props.article[`summary${item}`]}
                          className={`summaryHidden ${summaryClass}${
                            summaryClassSuffix
                          }`}
                          key={item}
                        />
                      );
                    })}
                  </View>
                )
              }
              datePublicationProps={{ date: publishedTime, showDay: false }}
              headline={() => (
                <ArticleSummaryHeadline
                  className={headlineClass}
                  headline={getHeadline(headline, shortHeadline)}
                  style={styles.headline}
                />
              )}
              labelProps={{
                color: colours.section[section] || colours.section.default,
                isVideo: hasVideo,
                title: label
              }}
            />
          </Card>
        </div>
      ),
      onPress
    });
  }
}

RelatedArticleItem.propTypes = relatedArticleItemPropTypes;
RelatedArticleItem.defaultProps = relatedArticleItemDefaultProps;

export default RelatedArticleItem;
