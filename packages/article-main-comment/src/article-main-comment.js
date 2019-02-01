/* eslint-disable consistent-return */

import React, { Component } from "react";
import ArticleError from "@times-components/article-error";
import ArticleSkeleton from "@times-components/article-skeleton";
import { getHeadline } from "@times-components/utils";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";

class ArticlePage extends Component {
  constructor() {
    super();
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    const { article, onAuthorPress } = this.props;
    const {
      bylines,
      flags,
      hasVideo,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst
    } = article;

    const authorImage =
      bylines &&
      bylines.length > 0 &&
      bylines[0].image &&
      Object.keys(bylines[0].image).length !== 0 &&
      bylines[0].image.crop
        ? bylines[0].image.crop.url
        : null;

    const authorByline =
      bylines && bylines.length > 0 && Object.keys(bylines[0]).length !== 0
        ? bylines[0].byline
        : null;

    return (
      <ArticleHeader
        authorImage={authorImage}
        byline={authorByline}
        flags={flags}
        hasVideo={hasVideo}
        headline={getHeadline(headline, shortHeadline)}
        label={label}
        onAuthorPress={onAuthorPress}
        publicationName={publicationName}
        publishedTime={publishedTime}
        standfirst={standfirst}
      />
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

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
