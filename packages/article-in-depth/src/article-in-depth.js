/* eslint-disable consistent-return */

import React, { Component, Fragment } from "react";
import { View } from "react-native";
import ArticleError from "@times-components/article-error";
import ArticleSkeleton from "@times-components/article-skeleton";
import ArticleLeadAsset from "@times-components/article-lead-asset";
import { CentredCaption } from "@times-components/caption";
import {
  getHeadline,
  getLeadAsset,
  getStandardTemplateCrop
} from "@times-components/utils";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";
import Meta from "./article-meta/article-meta";
import styles from "./styles";

class ArticleInDepth extends Component {
  constructor() {
    super();
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader({ width }) {
    const { article, onAuthorPress, onVideoPress } = this.props;
    const {
      backgroundColour,
      byline,
      flags,
      hasVideo,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
      textColour
    } = article;
    return (
      <Fragment>
        <ArticleHeader
          backgroundColour={backgroundColour}
          flags={flags}
          hasVideo={hasVideo}
          headline={getHeadline(headline, shortHeadline)}
          label={label}
          standfirst={standfirst}
          textColour={textColour}
        />
        <ArticleLeadAsset
          {...getLeadAsset(article)}
          getImageCrop={getStandardTemplateCrop}
          onVideoPress={onVideoPress}
          renderModalCaption={({ caption }) => <CentredCaption {...caption} />}
          style={styles.leadAsset}
          width={width}
        />
        <View style={styles.metaContainer}>
          <Meta
            backgroundColour={backgroundColour}
            byline={byline}
            onAuthorPress={onAuthorPress}
            publicationName={publicationName}
            publishedTime={publishedTime}
            textColour={textColour}
          />
        </View>
      </Fragment>
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
      onLinkPress,
      onRelatedArticlePress,
      onTopicPress,
      onTwitterLinkPress,
      onVideoPress,
      onViewed,
      receiveChildList
    } = this.props;

    return (
      <ArticleSkeleton
        adConfig={adConfig}
        analyticsStream={analyticsStream}
        data={article}
        Header={this.renderHeader}
        interactiveConfig={interactiveConfig}
        onAuthorPress={onAuthorPress}
        onCommentGuidelinesPress={onCommentGuidelinesPress}
        onCommentsPress={onCommentsPress}
        onLinkPress={onLinkPress}
        onRelatedArticlePress={onRelatedArticlePress}
        onTopicPress={onTopicPress}
        onTwitterLinkPress={onTwitterLinkPress}
        onVideoPress={onVideoPress}
        onViewableItemsChanged={onViewed ? this.onViewableItemsChanged : null}
        receiveChildList={receiveChildList}
      />
    );
  }
}

ArticleInDepth.propTypes = articlePropTypes;
ArticleInDepth.defaultProps = articleDefaultProps;

export default ArticleInDepth;
