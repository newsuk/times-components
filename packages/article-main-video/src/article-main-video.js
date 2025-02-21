import React, { Component } from "react";
import ArticleSkeleton from "@times-components/article-skeleton";
import { getHeadline, getLeadAsset } from "@times-components/utils";
import DatePublication from "@times-components/date-publication";
import ArticleTopics from "./article-topics";
import {
  articleDefaultProps,
  articlePropTypes
} from "./article-prop-types/article-prop-types";
import ArticleLeadAsset from "@times-components/article-lead-asset";

import {
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
import { Breadcrumb } from "@times-components/ts-components";

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
      publicationName,
      publishedTime,
      shortHeadline,
      leadAsset,
    } = article;

    const categoryColor = "#65EAFF";
    const videoDurationMS = 902000 ;
    const videoDuration = (videoDurationMS / 60000).toFixed(2);
    const formattedVideoDuration = videoDuration.replace(".", ":");
    const articleCategory = 'Life & Style';
    const relatedArticle = 'Inside the Balmain designer Olivier Rousteing\'s Parisian apartment';
    const upNextArticles = [
      {title: 'Article Title 1', posterImage: leadAsset.posterImage.crop169.url, duration: formattedVideoDuration },
      {title: 'Article Title 2', posterImage: leadAsset.posterImage.crop169.url, duration: formattedVideoDuration },
      {title: 'Article Title 3', posterImage: leadAsset.posterImage.crop169.url, duration: formattedVideoDuration },
      {title: 'Article Title 4', posterImage: leadAsset.posterImage.crop169.url, duration: formattedVideoDuration },
    ];

    return (
      <>
        <ArticleBodyContainer>
          <ArticleBody>
            <ArticleLabelContainer>
              <ArticleLabelText>
                <ArticleLabelText as='span' $color={categoryColor}>{articleCategory}</ArticleLabelText>
                {` | `}
                {formattedVideoDuration}
              </ArticleLabelText>
            </ArticleLabelContainer>
            <ArticleContentContainer>
              <ArticleHeadline>{getHeadline(headline, shortHeadline)}</ArticleHeadline>
              <ArticleMeta>
                <DatePublication date={publishedTime} publication={publicationName} />
              </ArticleMeta>
              <ArticleContent>
                {content}
              </ArticleContent>
            </ArticleContentContainer>
            <SaveAndShareContainer>
              {SaveAndShare}
            </SaveAndShareContainer>
            {relatedArticle && (
              <ArticleContentContainer>
                <ArticleLabelText $color="#AAA">Related</ArticleLabelText>
                <ArticleTitle>{relatedArticle}</ArticleTitle>
              </ArticleContentContainer>
            )}
          </ArticleBody>
        </ArticleBodyContainer>
        <ArticleUpNext upNextArticles={upNextArticles} />
      </>
    );
  }

  renderContentFooter() {
    const { article } = this.props;
    const {
      breadcrumbs,
      topics
    } = article;

    return (
      <ArticleBodyContainer>
        <ContentFooterContainer>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <BreadcrumbContainer>
              <Breadcrumb data={breadcrumbs} />
            </BreadcrumbContainer>
          )}
          <ArticleTopics topics={topics} />
        </ContentFooterContainer>
      </ArticleBodyContainer>
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
        <ArticleLeadAssetContainer>
          <ArticleLeadAsset {...getLeadAsset(article)} />
        </ArticleLeadAssetContainer>

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
