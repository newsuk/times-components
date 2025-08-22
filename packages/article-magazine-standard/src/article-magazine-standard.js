import React, { Component, Fragment } from "react";
import ArticleSkeleton from "@times-components/article-skeleton";
import {
  getHeadline,
  getLeadAsset,
  getStandardTemplateCrop
} from "@times-components/utils";
import { CentredCaption } from "@times-components/caption";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";
import newStyles from "./newStyles";
import { LeadAsset } from "./newStyles/responsive";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    const { article, removeTeaserContent } = this.props;
    const {
      bylines,
      expirableFlags,
      hasVideo,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
      updatedTime
    } = article;

    return (
      <Fragment>
        <ArticleHeader
          bylines={bylines}
          flags={expirableFlags}
          hasVideo={hasVideo}
          headline={getHeadline(headline, shortHeadline)}
          label={label}
          publicationName={publicationName}
          publishedTime={publishedTime}
          standfirst={standfirst}
          updatedTime={updatedTime}
        />
        {!removeTeaserContent && (
          <LeadAsset
            {...getLeadAsset(article)}
            getImageCrop={getStandardTemplateCrop}
            renderCaption={({ caption }) => <CentredCaption {...caption} />}
            style={newStyles.leadAssetContainer}
          />
        )}
      </Fragment>
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
      articleDataFromRender,
      paidContentClassName,
      isPreview,
      swgProductId,
      isNewCommentingBannerEnabled,
      removeTeaserContent
    } = this.props;

    console.log('ARTICLETC', article)
    console.log('analyticsStream', analyticsStream)
    console.log('articleDataFromRender', articleDataFromRender)


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
        articleDataFromRender={articleDataFromRender}
        paidContentClassName={paidContentClassName}
        isPreview={isPreview}
        swgProductId={swgProductId}
        isNewCommentingBannerEnabled={isNewCommentingBannerEnabled}
        removeTeaserContent={removeTeaserContent}
      />
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
