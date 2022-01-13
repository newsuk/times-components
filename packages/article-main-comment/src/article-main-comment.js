import React, { Component } from "react";
import ArticleSkeleton from "@times-components/article-skeleton";
import { getHeadline } from "@times-components/utils";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    const { article } = this.props;
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

    return (
      <ArticleHeader
        authorImage={authorImage}
        bylines={bylines}
        flags={expirableFlags}
        hasVideo={hasVideo}
        headline={getHeadline(headline, shortHeadline)}
        label={label}
        publicationName={publicationName}
        publishedTime={publishedTime}
        standfirst={standfirst}
      />
    );
  }

  render() {
    const {
      article,
      analyticsStream,
      error,
      isLoading,
      logoUrl,
      navigationMode,
      receiveChildList,
      commentingConfig,
      paidContentClassName,
      isPreview,
      swgProductId,
      additionalRelatedArticlesFlag,
      algoliaSearchKeys,
      latestFromSectionFlag,
      latestFromSection,
      olympicsKeys
    } = this.props;

    if (error || isLoading) {
      return null;
    }

    return (
      <ArticleSkeleton
        analyticsStream={analyticsStream}
        data={article}
        Header={this.renderHeader}
        logoUrl={logoUrl}
        receiveChildList={receiveChildList}
        navigationMode={navigationMode}
        commentingConfig={commentingConfig}
        paidContentClassName={paidContentClassName}
        isPreview={isPreview}
        swgProductId={swgProductId}
        additionalRelatedArticlesFlag={additionalRelatedArticlesFlag}
        algoliaSearchKeys={algoliaSearchKeys}
        latestFromSectionFlag={latestFromSectionFlag}
        latestFromSection={latestFromSection}
        olympicsKeys={olympicsKeys}
      />
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
