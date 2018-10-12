import React, { Component } from "react";
import Ad, { AdComposer } from "@times-components/ad";
import RelatedArticles from "@times-components/related-articles";
import LazyLoad from "@times-components/lazy-load";
import { spacing } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
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
  articlePagePropTypes,
  articlePageDefaultProps
} from "./article-page-prop-types";
import getHeadline from "./utils";

import {
  MainContainer,
  HeaderContainer,
  MetaContainer,
  LeadAssetContainer,
  BodyContainer,
  HeaderAdContainer
} from "./styles/responsive";

const ArticlePage = ({
  analyticsStream,
  article,
  onRelatedArticlePress,
  onTopicPress
}) => {

  console.log(article);

  const {
    content,
    section,
    url,
    topics,
    relatedArticleSlice
  } = article;

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
    <BodyContainer>
      <ArticleBody content={content} contextUrl={url} section={section} />
      <ArticleTopics onPress={onTopicPress} topics={topics} />
      <aside>{displayRelatedArticles}</aside>
    </BodyContainer>
  );
};

ArticlePage.propTypes = articlePagePropTypes;
ArticlePage.defaultProps = articlePageDefaultProps;

export default ArticlePage;
