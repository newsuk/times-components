/* eslint-disable consistent-return */

import React, { Component, Fragment } from "react";
import ArticleError from "@times-components/article-error";
import ArticleSkeleton from "@times-components/article-skeleton";
import {
  getHeadline,
  getLeadAsset,
  getStandardTemplateCrop
} from "@times-components/utils";
import { CentredCaption } from "@times-components/caption";
import ArticleLeadAsset from "@times-components/article-lead-asset";
import { ResponsiveContext } from "@times-components/responsive";
import { tabletWidth } from "@times-components/styleguide";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";
import styles from "./styles";

class ArticleMagazineComment extends Component {
  constructor() {
    super();
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader({ width }) {
    const { article, onAuthorPress, onImagePress, onVideoPress } = this.props;
    const {
      bylines,
      expirableFlags,
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
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <Fragment>
            <ArticleHeader
              authorImage={authorImage}
              byline={authorByline}
              flags={expirableFlags}
              hasVideo={hasVideo}
              headline={getHeadline(headline, shortHeadline)}
              isTablet={isTablet}
              label={label}
              onAuthorPress={onAuthorPress}
              publicationName={publicationName}
              publishedTime={publishedTime}
              standfirst={standfirst}
            />
            <ArticleLeadAsset
              {...getLeadAsset(article)}
              getImageCrop={getStandardTemplateCrop}
              onImagePress={onImagePress}
              onVideoPress={onVideoPress}
              renderCaption={({ caption }) => <CentredCaption {...caption} />}
              style={[
                styles.leadAssetContainer,
                isTablet && styles.leadAssetContainerTablet
              ]}
              width={Math.min(width, tabletWidth)}
            />
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
      <ArticleSkeleton
        adConfig={adConfig}
        analyticsStream={analyticsStream}
        data={article}
        Header={this.renderHeader}
        interactiveConfig={interactiveConfig}
        onAuthorPress={onAuthorPress}
        onCommentGuidelinesPress={onCommentGuidelinesPress}
        onCommentsPress={onCommentsPress}
        onImagePress={onImagePress}
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

ArticleMagazineComment.propTypes = articlePropTypes;
ArticleMagazineComment.defaultProps = articleDefaultProps;

export default ArticleMagazineComment;
