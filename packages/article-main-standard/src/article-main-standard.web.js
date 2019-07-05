/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
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
  HeaderContainer,
  LeadAsset,
  MetaContainer,
  OuterHeaderContainer,
  HeaderTopContainer
} from "./styles/responsive.web";

const renderCaption = ({ caption }) => (
  <LeadAssetCaptionContainer>
    <Caption {...caption} />
  </LeadAssetCaptionContainer>
);

function MainStandardHeader({ article, width, saveAndShareBar = null }) {
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

  const leadAsset = (
    <LeadAsset
      {...getLeadAsset(article)}
      renderCaption={renderCaption}
      width={width}
    />
  );
  const metaProps = { bylines, publicationName, publishedTime };

  return (
    <OuterHeaderContainer>
      <HeaderTopContainer>
        <HeaderContainer>
          <ArticleHeader
            flags={expirableFlags}
            hasVideo={hasVideo}
            headline={getHeadline(headline, shortHeadline)}
            label={label}
            standfirst={standfirst}
          />
        </HeaderContainer>
        <MetaContainer>
          <ArticleMeta {...metaProps} />
          <ArticleTopics topics={topics} />
        </MetaContainer>
      </HeaderTopContainer>
      {leadAsset}
      <ArticleMeta {...metaProps} inline className="inline-meta" />
      {saveAndShareBar}
    </OuterHeaderContainer>
  );
}

MainStandardHeader.propTypes = {
  article: articlePropTypes.article,
  width: PropTypes.number.isRequired,
  saveAndShareBar: PropTypes.element
};

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
