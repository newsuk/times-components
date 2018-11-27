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
      author,
      byline,
      flags,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst
    } = article;

    const authorImage = author && author.image ? author.image : null;

    return (
      <ArticleHeader
        authorImage={authorImage}
        byline={byline}
        flags={flags}
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
