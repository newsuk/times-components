import React, { Component, Fragment } from "react";
import ArticleSkeleton from "@times-components/article-skeleton";
import { getHeadline, getLeadAsset } from "@times-components/utils";
import Caption from "@times-components/caption";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import ArticleTopics from "./article-topics";
import {
  articleDefaultProps,
  articlePropTypes
} from "./article-prop-types/article-prop-types";
import { LeadAssetCaptionContainer } from "./styles/article-body/responsive";

import {
  ArticleMainStandardContainer,
  HeaderContainer,
  HeaderTopContainer,
  LeadAsset,
  MetaContainer,
  EmptyTeaserPadding
} from "./styles/responsive";

const renderCaption = ({ caption }) => (
  <LeadAssetCaptionContainer>
    <Caption {...caption} />
  </LeadAssetCaptionContainer>
);

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    const { article, removeTeaserContent } = this.props;
    const {
      bylines,
      hasVideo,
      headline,
      expirableFlags,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
      topics,
      updatedTime
    } = article;

    const metaProps = { bylines, publicationName, publishedTime };

    return (
      <Fragment>
        <HeaderTopContainer>
          <HeaderContainer>
            {removeTeaserContent && <EmptyTeaserPadding />}
            <ArticleHeader
              flags={expirableFlags}
              hasVideo={hasVideo}
              headline={getHeadline(headline, shortHeadline)}
              label={label}
              standfirst={standfirst}
              updatedTime={updatedTime}
            />
          </HeaderContainer>
          {!removeTeaserContent && (
            <MetaContainer>
              <ArticleMeta {...metaProps} />
              <ArticleTopics topics={topics} />
            </MetaContainer>
          )}
        </HeaderTopContainer>
        {!removeTeaserContent && (
          <LeadAsset {...getLeadAsset(article)} renderCaption={renderCaption} />
        )}
        {!removeTeaserContent && (
          <ArticleMeta {...metaProps} inline className="inline-meta" />
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
      getFallbackThumbnailUrl169,
      zephrDivs,
      removeTeaserContent
    } = this.props;

    if (error || isLoading) {
      return null;
    }

    return (
      <ArticleMainStandardContainer>
        <ArticleSkeleton
          analyticsStream={analyticsStream}
          data={article}
          Header={this.renderHeader}
          logoUrl={logoUrl}
          getFallbackThumbnailUrl169={getFallbackThumbnailUrl169}
          receiveChildList={receiveChildList}
          navigationMode={navigationMode}
          commentingConfig={commentingConfig}
          articleDataFromRender={articleDataFromRender}
          paidContentClassName={paidContentClassName}
          isPreview={isPreview}
          swgProductId={swgProductId}
          isNewCommentingBannerEnabled={isNewCommentingBannerEnabled}
          zephrDivs={zephrDivs}
          removeTeaserContent={removeTeaserContent}
        />
      </ArticleMainStandardContainer>
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
