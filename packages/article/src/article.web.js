import React, { Component, Fragment } from "react";
import Ad, { AdComposer } from "@times-components/ad";
import RelatedArticles from "@times-components/related-articles";
import ArticleBody from "./article-body/article-body";
import ArticleError from "./article-error";
import ArticleHeader from "./article-header/article-header";
import ArticleLoading from "./article-loading";
import ArticleMeta from "./article-meta/article-meta";
import ArticleTopics from "./article-topics";
import LeadAssetComponent from "./article-lead-asset/article-lead-asset";
import getLeadAsset from "./article-lead-asset/get-lead-asset";
import articleTrackingContext from "./article-tracking-context";
import { articlePropTypes, articleDefaultProps } from "./article-prop-types";

import {
  MainContainer,
  HeaderContainer,
  MetaContainer,
  LeadAssetContainer,
  BodyContainer,
  HeaderAdContainer
} from "./styles/responsive";

const adStyle = {
  marginBottom: 0
};

class ArticlePage extends Component {
  static renderArticle(
    articleData,
    onAuthorPress,
    onLinkPress,
    onRelatedArticlePress,
    onTopicPress
  ) {
    const {
      headline,
      flags,
      standfirst,
      label,
      byline,
      publishedTime,
      publicationName,
      content,
      section,
      url,
      topics,
      relatedArticles,
      relatedArticlesLayout
    } = articleData;
    const leadAssetProps = getLeadAsset(articleData);
    const displayRelatedArticles =
      relatedArticlesLayout && relatedArticlesLayout.template ? (
        <RelatedArticles
          analyticsStream={() => {}}
          articles={relatedArticles}
          template={relatedArticlesLayout.template}
          onPress={onRelatedArticlePress}
          mainId={relatedArticlesLayout.main}
        />
      ) : null;

    return (
      <Fragment>
        <HeaderAdContainer key="headerAd">
          <Ad pos="header" style={adStyle} section={section} contextUrl={url} />
        </HeaderAdContainer>
        <MainContainer>
          <HeaderContainer>
            <ArticleHeader
              headline={headline}
              flags={flags}
              standfirst={standfirst}
              label={label}
              isVideo={leadAssetProps.isVideo}
            />
          </HeaderContainer>
          <MetaContainer>
            <ArticleMeta
              byline={byline}
              publishedTime={publishedTime}
              publicationName={publicationName}
              onAuthorPress={onAuthorPress}
            />
            <ArticleTopics
              topics={topics}
              device="DESKTOP"
              onPress={onTopicPress}
            />
          </MetaContainer>
          <LeadAssetContainer>
            <LeadAssetComponent {...leadAssetProps} />
          </LeadAssetContainer>
          <BodyContainer>
            <ArticleBody
              content={content}
              section={section}
              contextUrl={url}
              onLinkPress={onLinkPress}
            />
          </BodyContainer>
        </MainContainer>
        <ArticleTopics topics={topics} onPress={onTopicPress} />
        {displayRelatedArticles}
        <Ad pos="pixel" section={section} contextUrl={url} />
        <Ad pos="pixelteads" section={section} contextUrl={url} />
        <Ad pos="pixelskin" section={section} contextUrl={url} />
      </Fragment>
    );
  }

  render() {
    const {
      error,
      isLoading,
      onAuthorPress,
      onLinkPress,
      onRelatedArticlePress,
      onTopicPress
    } = this.props;

    if (error) {
      return <ArticleError {...error} />;
    }

    if (isLoading) {
      return <ArticleLoading />;
    }

    return (
      <AdComposer adConfig={this.props.adConfig}>
        {ArticlePage.renderArticle(
          this.props.article,
          onAuthorPress,
          onLinkPress,
          onRelatedArticlePress,
          onTopicPress
        )}
      </AdComposer>
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default articleTrackingContext(ArticlePage);
