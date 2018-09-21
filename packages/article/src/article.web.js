import React from "react";
import Ad, { AdComposer } from "@times-components/ad";
import RelatedArticles from "@times-components/related-articles";
import ArticleBody from "./article-body/article-body";
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

const renderArticle = (
  articleData,
  analyticsStream,
  onAuthorPress,
  onRelatedArticlePress,
  onTopicPress
) => {
  const {
    hasVideo,
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
    relatedArticleSlice
  } = articleData;
  const leadAssetProps = getLeadAsset(articleData);
  const displayRelatedArticles = relatedArticleSlice ? (
    <RelatedArticles
      analyticsStream={analyticsStream}
      slice={{
        ...relatedArticleSlice,
        sliceName: relatedArticleSlice.__typename // eslint-disable-line no-underscore-dangle
      }}
    />
  ) : null;

  return (
    <article>
      <HeaderAdContainer key="headerAd">
        <Ad
          contextUrl={url}
          section={section}
          slotName="header"
          style={adStyle}
        />
      </HeaderAdContainer>
      <MainContainer>
        <header>
          <HeaderContainer>
            <ArticleHeader
              flags={flags}
              hasVideo={hasVideo}
              headline={headline}
              label={label}
              standfirst={standfirst}
            />
          </HeaderContainer>
          <MetaContainer>
            <ArticleMeta
              byline={byline}
              onAuthorPress={onAuthorPress}
              publicationName={publicationName}
              publishedTime={publishedTime}
            />
            <ArticleTopics
              device="DESKTOP"
              onPress={onTopicPress}
              topics={topics}
            />
          </MetaContainer>
          <LeadAssetContainer>
            <LeadAssetComponent {...leadAssetProps} />
          </LeadAssetContainer>
        </header>
        <BodyContainer>
          <ArticleBody content={content} contextUrl={url} section={section} />
        </BodyContainer>
      </MainContainer>
      <ArticleTopics onPress={onTopicPress} topics={topics} />
      <aside>{displayRelatedArticles}</aside>
      <Ad contextUrl={url} section={section} slotName="pixel" />
      <Ad contextUrl={url} section={section} slotName="pixelteads" />
      <Ad contextUrl={url} section={section} slotName="pixelskin" />
    </article>
  );
};

const ArticlePage = ({
  adConfig,
  analyticsStream,
  article,
  error,
  isLoading,
  onAuthorPress,
  onRelatedArticlePress,
  onTopicPress
}) => {
  if (error) {
    return null;
  }

  if (isLoading) {
    return <ArticleLoading />;
  }

  return (
    <AdComposer adConfig={adConfig}>
      {renderArticle(
        article,
        analyticsStream,
        onAuthorPress,
        onRelatedArticlePress,
        onTopicPress
      )}
    </AdComposer>
  );
};

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default articleTrackingContext(ArticlePage);
