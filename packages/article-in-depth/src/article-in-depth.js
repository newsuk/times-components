/* eslint-disable consistent-return */

import React, { Component, Fragment } from "react";
import { View } from "react-native";
import ArticleError from "@times-components/article-error";
import ArticleSkeleton from "@times-components/article-skeleton";
import ArticleLeadAsset from "@times-components/article-lead-asset";
import { CentredCaption } from "@times-components/caption";
import { ResponsiveContext } from "@times-components/responsive";
import {
  getHeadline,
  getLeadAsset,
  getStandardTemplateCrop
} from "@times-components/utils";
import Context from "@times-components/context";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";
import Meta from "./article-meta/article-meta";
import styles from "./styles";

class ArticleInDepth extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader({ width }) {
    const { article, onAuthorPress, onImagePress, onVideoPress } = this.props;
    const {
      backgroundColour,
      bylines,
      expirableFlags,
      hasVideo,
      headline,
      label,
      longRead,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
      textColour
    } = article;
    return (
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <Fragment>
            <ArticleHeader
              backgroundColour={backgroundColour}
              flags={expirableFlags}
              hasVideo={hasVideo}
              headline={getHeadline(headline, shortHeadline)}
              isTablet={isTablet}
              label={label}
              longRead={longRead}
              standfirst={standfirst}
              textColour={textColour}
            />
            <ArticleLeadAsset
              {...getLeadAsset(article)}
              getImageCrop={getStandardTemplateCrop}
              onImagePress={onImagePress}
              onVideoPress={onVideoPress}
              renderCaption={({ caption }) =>
                caption && caption.text && <CentredCaption {...caption} />
              }
              style={[styles.leadAsset, isTablet && styles.leadAssetTablet]}
              width={width}
            />
            <View
              style={[
                styles.metaContainer,
                isTablet && styles.metaContainerTablet
              ]}
            >
              <Meta
                backgroundColour={backgroundColour}
                bylines={bylines}
                isTablet={isTablet}
                onAuthorPress={onAuthorPress}
                publicationName={publicationName}
                publishedTime={publishedTime}
                textColour={textColour}
              />
            </View>
          </Fragment>
        )}
      </ResponsiveContext.Consumer>
    );
  }

  render() {
    const { error, refetch, isLoading } = this.props;

    if (error) {
      return <ArticleError refetch={refetch} />;
    }

    if (isLoading) {
      return null;
    }

    const {
      adConfig,
      analyticsStream,
      article,
      interactiveConfig,
      onAuthorPress,
      onCommentGuidelinesPress,
      onCommentsPress,
      onImagePress,
      onLinkPress,
      onRelatedArticlePress,
      onTopicPress,
      onTwitterLinkPress,
      onVideoPress,
      onViewed,
      receiveChildList
    } = this.props;

    return (
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <Context.Consumer>
            {({ theme: { scale, dropCapFont } }) => (
              <ArticleSkeleton
                adConfig={adConfig}
                analyticsStream={analyticsStream}
                data={article}
                dropCapFont={dropCapFont}
                Header={this.renderHeader}
                interactiveConfig={interactiveConfig}
                isTablet={isTablet}
                onAuthorPress={onAuthorPress}
                onCommentGuidelinesPress={onCommentGuidelinesPress}
                onCommentsPress={onCommentsPress}
                onImagePress={onImagePress}
                onLinkPress={onLinkPress}
                onRelatedArticlePress={onRelatedArticlePress}
                onTopicPress={onTopicPress}
                onTwitterLinkPress={onTwitterLinkPress}
                onVideoPress={onVideoPress}
                onViewableItemsChanged={
                  onViewed ? this.onViewableItemsChanged : null
                }
                receiveChildList={receiveChildList}
                scale={scale}
              />
            )}
          </Context.Consumer>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

ArticleInDepth.propTypes = articlePropTypes;
ArticleInDepth.defaultProps = articleDefaultProps;

export default ArticleInDepth;
