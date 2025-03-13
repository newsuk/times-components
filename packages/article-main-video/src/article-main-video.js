import React, { Component } from "react";
import ArticleSkeleton from "@times-components/article-skeleton";
import { getHeadline } from "@times-components/utils";
import DatePublication from "@times-components/date-publication";
import ArticleLeadAsset from "@times-components/article-lead-asset";
import { Breadcrumb } from "@times-components/ts-components";
import Link from "@times-components/link";
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
  ContentFooterContainer
} from "./styles/responsive";
import { ArticleUpNext } from "./article-up-next/article-up-next";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderContentFooter = this.renderContentFooter.bind(this);
  }

  renderContent({ content, SaveAndShare }) {
    const { article } = this.props;
    const {
      headline,
      categoryPath,
      publicationName,
      publishedTime,
      shortHeadline,
      leadAsset,
      relatedArticles,
      upNext
    } = article;

    const articleCategory = categoryPath && categoryPath.split("/")[1];
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

    const categoryColor = categoryColors[articleCategory];

    const formatVideoDuration = videoDurationMs => {
      const videoDuration = (videoDurationMs / 60000).toFixed(2);
      const formattedVideoDuration = videoDuration.replace(".", ":");
      return formattedVideoDuration;
    };

    const upNextArticles =
      upNext &&
      upNext.map(upNextArticle => ({
        id: upNextArticle.id,
        title: upNextArticle.headline,
        url: upNextArticle.url,
        posterImage: upNextArticle.leadAsset.posterImage.crop169,
        duration: formatVideoDuration(upNextArticle.leadAsset.duration)
      }));

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
                      {articleCategory}
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
            {!!relatedArticles && (
              <ArticleContentContainer>
                <ArticleLabelText $color="#AAA">
                  Related Article
                </ArticleLabelText>
                <Link url={relatedArticles[0].url}>
                  <ArticleTitle>{relatedArticles[0].headline}</ArticleTitle>
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
    const { article } = this.props;
    const { breadcrumbs, topics } = article;

    return (
      <ContentFooterContainer>
        {breadcrumbs &&
          breadcrumbs.length > 0 && (
            <BreadcrumbContainer>
              <Breadcrumb data={breadcrumbs} />
            </BreadcrumbContainer>
          )}
        <ArticleTopics topics={topics} />
      </ContentFooterContainer>
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
      storefrontConfig
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
          storefrontConfig={storefrontConfig}
        />
      </ArticleMainVideoContainer>
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
