import React, { Component } from "react";
import ArticleSkeleton, {
  InlineAdWrapper,
  InlineAdTitle
} from "@times-components/article-skeleton";
import { AdContainer } from "@times-components/ad";
import { getHeadline } from "@times-components/utils";
import DatePublication from "@times-components/date-publication";
import ArticleLeadAsset from "@times-components/article-lead-asset";
import { Breadcrumb } from "@times-components/ts-components";
import Link from "@times-components/link";
import UserState from "@times-components/user-state";
import ArticleComments from "@times-components/article-comments";
import ArticleTopics from "./article-topics";
import {
  articleDefaultProps,
  articlePropTypes
} from "./article-prop-types/article-prop-types";

import {
  VideoArticleContainer,
  ArticleBodyContainer,
  ArticleBody,
  ArticleLeadAssetContainer,
  ArticleContentContainer,
  ArticleContent,
  ArticleMeta,
  ArticleMainVideoContainer,
  SaveAndShareContainer,
  ArticleLabelContainer,
  ArticleLabelText,
  ArticleHeadline,
  ArticleTitle,
  BreadcrumbContainer,
  ContentFooterContainer,
  CommentContainer
} from "./styles/responsive";
import { ArticleUpNext } from "./article-up-next/article-up-next";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderContentFooter = this.renderContentFooter.bind(this);
  }

  renderContent({ content, SaveAndShare }) {
    const { article, articleDataFromRender } = this.props;
    const {
      headline,
      publicationName,
      publishedTime,
      shortHeadline,
      leadAsset,
      relatedArticleSlice,
      upNext
    } = article;
    const { breadcrumbs } = articleDataFromRender || {};

    const primaryCategory =
      breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs[0] : null;
    const categoryLabel = (primaryCategory && primaryCategory.title) || "";
    const categoryUrl =
      (primaryCategory && primaryCategory.url.split("/")[1]) || "";
    const categoryColors = {
      comment: "#9b1f45",
      "business-money": "#21709c",
      sport: "#007a3f",
      "life-style": "#149fb5",
      culture: "#942364",
      travel: "#145683",
      world: "#005e61",
      uk: "#39556a"
    };

    const categoryColor = categoryColors[categoryUrl];

    const formatVideoDuration = videoDurationMs => {
      if (videoDurationMs) {
        const videoDuration = (videoDurationMs / 60000).toFixed(2);
        const formattedVideoDuration = videoDuration.replace(".", ":");
        return formattedVideoDuration;
      }
      return null;
    };

    const upNextArticles =
      upNext && upNext.items
        ? upNext.items.map(upNextArticle => ({
            id: upNextArticle.article.id,
            title: upNextArticle.article.headline,
            url: upNextArticle.article.url,
            posterImage:
              upNextArticle.article.leadAsset.posterImage.crop169.url,
            duration: formatVideoDuration(
              upNextArticle.article.leadAsset.duration
            )
          }))
        : null;

    const leadAssetUrl = leadAsset.posterImage && leadAsset.posterImage.crop169;

    return (
      <VideoArticleContainer>
        <ArticleBodyContainer>
          <ArticleLeadAssetContainer>
            <ArticleLeadAsset
              aspectRatio="16:9"
              displayImage={leadAssetUrl}
              getImageCrop={() => leadAssetUrl}
              leadAsset={article.leadAsset}
              isVideo
            />
          </ArticleLeadAssetContainer>

          <ArticleBody>
            <ArticleLabelContainer>
              <ArticleLabelText>
                {categoryColor && (
                  <>
                    <ArticleLabelText as="span" $color={categoryColor}>
                      {categoryLabel}
                    </ArticleLabelText>
                    {` | `}
                  </>
                )}
                {formatVideoDuration(leadAsset.duration)}
              </ArticleLabelText>
            </ArticleLabelContainer>
            <ArticleContentContainer>
              <ArticleHeadline>
                {getHeadline(headline, shortHeadline)}
              </ArticleHeadline>
              <ArticleMeta>
                <DatePublication
                  date={publishedTime}
                  publication={publicationName}
                />
              </ArticleMeta>
              <ArticleContent>{content}</ArticleContent>
            </ArticleContentContainer>
            <SaveAndShareContainer>{SaveAndShare}</SaveAndShareContainer>
            {!!relatedArticleSlice && (
              <ArticleContentContainer>
                <ArticleLabelText $color="#AAA">
                  Related Article
                </ArticleLabelText>
                <Link url={relatedArticleSlice.items[0].article.url}>
                  <ArticleTitle>
                    {relatedArticleSlice.items[0].article.headline}
                  </ArticleTitle>
                </Link>
              </ArticleContentContainer>
            )}
          </ArticleBody>
        </ArticleBodyContainer>
        {!!upNextArticles && <ArticleUpNext upNextArticles={upNextArticles} />}
      </VideoArticleContainer>
    );
  }

  renderContentFooter() {
    const { article, articleDataFromRender, commentingConfig } = this.props;
    const { topics, commentsEnabled, id } = article;
    const { breadcrumbs } = articleDataFromRender || {};

    const disabledAds = ["c8bf6998-d498-11ed-b5c3-54651fc826e9"];

    const renderAd = slot =>
      disabledAds.includes(id) ? null : (
        <InlineAdWrapper>
          <InlineAdTitle>Advertisement</InlineAdTitle>
          <AdContainer slotName={slot} />
        </InlineAdWrapper>
      );
    return (
      <>
        <ContentFooterContainer>
          {breadcrumbs &&
            breadcrumbs.length > 0 && (
              <BreadcrumbContainer>
                <Breadcrumb data={breadcrumbs} />
              </BreadcrumbContainer>
            )}
          <ArticleTopics topics={topics} />
          {renderAd("inline-ad")}
        </ContentFooterContainer>
        <UserState state={UserState.showArticleExtras}>
          <CommentContainer>
            <ArticleComments
              articleId={id}
              isEnabled={commentsEnabled}
              commentingConfig={commentingConfig}
              domainSpecificUrl="https://www.thetimes.com"
              isDark
            />
          </CommentContainer>
        </UserState>
        <ContentFooterContainer>
          {renderAd("ad-article-inline-1")}
        </ContentFooterContainer>
      </>
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
      getFallbackThumbnailUrl169,
      zephrDivs,
      removeTeaserContent
    } = this.props;

    if (error || isLoading) {
      return null;
    }

    return (
      <ArticleMainVideoContainer>
        <ArticleSkeleton
          analyticsStream={analyticsStream}
          data={article}
          Content={this.renderContent}
          ContentFooter={this.renderContentFooter}
          logoUrl={logoUrl}
          getFallbackThumbnailUrl169={getFallbackThumbnailUrl169}
          receiveChildList={receiveChildList}
          navigationMode={navigationMode}
          commentingConfig={commentingConfig}
          articleDataFromRender={articleDataFromRender}
          paidContentClassName={paidContentClassName}
          isPreview={isPreview}
          swgProductId={swgProductId}
          zephrDivs={zephrDivs}
          removeTeaserContent={removeTeaserContent}
        />
      </ArticleMainVideoContainer>
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
