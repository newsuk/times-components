import React, { useContext } from "react";
import ArticleSkeleton, {
  ArticleKeylineContainer
} from "@times-components/article-skeleton";
import { getHeadline, getLeadAsset } from "@times-components/utils";
import Caption from "@times-components/caption";
import { ResponsiveContext } from "@times-components/responsive";
import { breakpoints } from "@times-components/styleguide";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import ArticleTopics from "./article-topics";
import {
  articleDefaultProps,
  articlePropTypes
} from "./article-prop-types/article-prop-types";
import { LeadAssetCaptionContainer } from "./styles/article-body/responsive";

import { HeaderContainer, LeadAsset, MetaContainer } from "./styles/responsive";

const renderCaption = ({ caption }) => (
  <LeadAssetCaptionContainer>
    <Caption {...caption} />
  </LeadAssetCaptionContainer>
);

function MainStandardHeader({ article, saveAndShareBar, width }) {
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
    topics
  } = article;

  const { screenWidth } = useContext(ResponsiveContext);
  const isWide = screenWidth >= breakpoints.wide;

  const leadAsset = (
    <LeadAsset
      {...getLeadAsset(article)}
      renderCaption={renderCaption}
      width={width}
    />
  );
  const articleMeta = (
    <ArticleMeta
      bylines={bylines}
      publicationName={publicationName}
      publishedTime={publishedTime}
      isWide={isWide}
    />
  );
  return (
    <>
      {isWide ? null : leadAsset}
      <HeaderContainer>
        <ArticleHeader
          flags={expirableFlags}
          hasVideo={hasVideo}
          headline={getHeadline(headline, shortHeadline)}
          label={label}
          standfirst={standfirst}
        />
      </HeaderContainer>
      {isWide ? (
        <MetaContainer>
          {articleMeta}
          <ArticleTopics topics={topics} />
        </MetaContainer>
      ) : null}
      <ArticleKeylineContainer>
        {isWide ? leadAsset : articleMeta}
        {saveAndShareBar}
      </ArticleKeylineContainer>
    </>
  );
}

function ArticlePage({
  adConfig,
  article,
  analyticsStream,
  error,
  isLoading,
  receiveChildList,
  saveApi,
  spotAccountId,
  paidContentClassName,
  faviconUrl
}) {
  if (error || isLoading) {
    return null;
  }

  return (
    <ArticleSkeleton
      adConfig={adConfig}
      analyticsStream={analyticsStream}
      data={article}
      Header={MainStandardHeader}
      receiveChildList={receiveChildList}
      saveApi={saveApi}
      spotAccountId={spotAccountId}
      paidContentClassName={paidContentClassName}
      faviconUrl={faviconUrl}
    />
  );
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
