import React from "react";
import { Text } from "react-native";
import Ad, { AdComposer } from "@times-components/ad";
import Article from "@times-components/article";
import { withTrackScrollDepth } from "@times-components/tracking";
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
  HeaderAdContainer
} from "./styles/responsive";

const adStyle = {
  marginBottom: 0
};

const renderArticle = (
  article,
  analyticsStream,
  onAuthorPress,
  onRelatedArticlePress,
  onTopicPress) => {
  const {
    hasVideo,
    headline,
    flags,
    standfirst,
    label,
    byline,
    publishedTime,
    publicationName,
    section,
    url,
    topics
  } = article;
  const leadAssetProps = getLeadAsset(article);

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
        <Article
          analyticsStream={analyticsStream}
          article={article}
          onRelatedArticlePress={onRelatedArticlePress}
          onTopicPress={onTopicPress}
        />
        <Ad contextUrl={url} section={section} slotName="pixel" />
        <Ad contextUrl={url} section={section} slotName="pixelteads" />
        <Ad contextUrl={url} section={section} slotName="pixelskin" />
    </MainContainer>
  </article>
);
  }

const ArticleMainStandard = ({
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
}

ArticleMainStandard.propTypes = articlePropTypes;
ArticleMainStandard.defaultProps = articleDefaultProps;

export default articleTrackingContext(withTrackScrollDepth(ArticleMainStandard));

