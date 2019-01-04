/* eslint-disable consistent-return */

import React, { Component, Fragment } from "react";
import ArticleError from "@times-components/article-error";
import ArticleSkeleton from "@times-components/article-skeleton";
import {
  getHeadline,
  getLeadAsset,
  getStandardTemplateCrop
} from "@times-components/utils";
import Caption, { CentredCaption } from "@times-components/caption";
import LeadAsset from "@times-components/article-lead-asset";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";
import styles from "./styles";

class ArticleMagazineStandard extends Component {
  constructor() {
    super();
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader({ width }) {
    const { article, onAuthorPress, onVideoPress } = this.props;
    const {
      byline,
      flags,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst
    } = article;

    return (
      <Fragment>
        <ArticleHeader
          byline={byline}
          flags={flags}
          headline={getHeadline(headline, shortHeadline)}
          label={label}
          onAuthorPress={onAuthorPress}
          publicationName={publicationName}
          publishedTime={publishedTime}
          standfirst={standfirst}
        />
        <LeadAsset
          {...getLeadAsset(article)}
          getImageCrop={getStandardTemplateCrop}
          onVideoPress={onVideoPress}
          renderCaption={({ caption }) => <CentredCaption {...caption} />}
          renderModalCaption={({ caption }) => <Caption {...caption} />}
          style={styles.leadAssetContainer}
          width={width}
        />
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

ArticleMagazineStandard.propTypes = articlePropTypes;
ArticleMagazineStandard.defaultProps = articleDefaultProps;

export default ArticleMagazineStandard;
