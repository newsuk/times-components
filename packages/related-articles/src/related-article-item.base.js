import React, { createRef, Component } from "react";
import { TcView } from "@times-components/utils";

import get from "lodash.get";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline
} from "@times-components/article-summary";
import Card from "@times-components/card";
import { colours } from "@times-components/ts-styleguide";
import {
  relatedArticleItemPropTypes,
  relatedArticleItemDefaultProps
} from "./related-article-item-prop-types";
import styles from "./styles";
import getHeadline from "./utils";

const getImageUri = (leadAsset, leadAssetOverride, cropSize) => {
  const asset = leadAssetOverride || leadAsset;

  if (!asset) {
    return null;
  }

  return asset.posterImage
    ? get(asset, `posterImage.crop${cropSize}.url`)
    : get(asset, `crop${cropSize}.url`);
};

class RelatedArticleItem extends Component {
  constructor(props) {
    super(props);

    this.node = createRef();

    this.state = {
      highResSize: null
    };
  }

  componentDidMount() {
    const { imageConfig } = this.props;
    if (imageConfig.showHiRes) {
      this.setHighResSize();
    }
  }

  componentDidUpdate(prevProps) {
    const { imageConfig } = this.props;
    if (
      prevProps.imageConfig.showHiRes !== imageConfig.showHiRes &&
      imageConfig.showHiRes
    ) {
      this.setHighResSize();
    }
  }

  setHighResSize() {
    this.setState({
      highResSize: this.node.current.clientWidth
    });
  }

  render() {
    const {
      article: {
        bylines,
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
      leadAssetOverride,
      onPress,
      showImage,
      showSummary,
      summaryConfig: {
        lengths: summaryLengths = [],
        style: summaryStyle = {},
        type: summaryType
      },
      isWebPFormatActive
    } = this.props;
    const { article } = this.props;
    const { highResSize } = this.state;

    const imageUri = getImageUri(leadAsset, leadAssetOverride, cropSize);

    return children({
      article,
      card: (
        <TcView ref={this.node}>
          <Card
            contentContainerClass={contentContainerClass}
            highResSize={highResSize}
            imageContainerClass={imageContainerClass}
            imageAccessibilityLabel={shortHeadline}
            imageRatio={imageRatio}
            imageStyle={imageStyle}
            imageUri={imageUri}
            isReversed={isReversed}
            lowResQuality={3}
            lowResSize={200}
            relatedArticle
            showImage={showImage}
            isWebPFormatActive={isWebPFormatActive}
          >
            <ArticleSummary
              bylineProps={{
                ast: bylines,
                bylineClass,
                color: colours.section[section] || colours.section.default,
                isOpinionByline
              }}
              content={
                showSummary && (
                  <TcView style={summaryStyle}>
                    {summaryLengths.map(item => {
                      const summaryClassSuffix = `${item}Class`;
                      const summaryClass = summaryType
                        ? `${summaryType}Summary`
                        : `summary`;
                      return (
                        <ArticleSummaryContent
                          ast={article[`summary${item}`]}
                          className={`summaryHidden ${summaryClass}${summaryClassSuffix}`}
                          key={item}
                        />
                      );
                    })}
                  </TcView>
                )
              }
              datePublicationProps={{ date: publishedTime, showDay: false }}
              headline={
                <ArticleSummaryHeadline
                  className={headlineClass}
                  headline={getHeadline(headline, shortHeadline)}
                  style={styles.headline}
                />
              }
              labelProps={{
                color: colours.section[section] || colours.section.default,
                isVideo: hasVideo,
                title: label
              }}
            />
          </Card>
        </TcView>
      ),
      onPress
    });
  }
}

RelatedArticleItem.propTypes = relatedArticleItemPropTypes;
RelatedArticleItem.defaultProps = relatedArticleItemDefaultProps;

export default RelatedArticleItem;
