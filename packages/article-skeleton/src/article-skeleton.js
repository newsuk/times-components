import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { AdContainer } from "@times-components/ad";
import ArticleExtras from "@times-components/article-extras";
import LazyLoad from "@times-components/lazy-load";
import { spacing } from "@times-components/styleguide";
import { StickyProvider } from "@times-components/sticky";
import { withTrackScrollDepth } from "@times-components/tracking";
import {
  TrackingContextProvider,
  AlgoliaSearchProvider
} from "@times-components/ts-components";
import UserState from "@times-components/user-state";
import { MessageContext } from "@times-components/message-bar";

import ArticleBody, { ArticleLink } from "./article-body/article-body";
import {
  articleSkeletonDefaultProps,
  articleSkeletonPropTypes
} from "./article-skeleton-prop-types";
import articleTrackingContext from "./tracking/article-tracking-context";
import tagLastParagraph from "./tracking/article-tracking-last-paragraph";

import {
  BodyContainer,
  getHeaderAdStyles,
  HeaderContainer,
  MainContainer
} from "./styles/responsive";
import styles from "./styles/article-body/index";
import Head from "./head";
import PaywallPortal from "./paywall-portal";
import StickySaveAndShareBar from "./sticky-save-and-share-bar";
import insertDropcapIntoAST from "./contentModifiers/dropcap-util";
import insertNewsletterPuff from "./contentModifiers/newsletter-puff";
import insertInlineRelatedArticles from "./contentModifiers/inline-related-article";
import insertNativeAd from "./contentModifiers/native-ad";
import insertInlineAd from "./contentModifiers/inline-ad";
import { getIsLiveOrBreakingFlag } from "./data-helper";

export const reduceArticleContent = (content, reducers) =>
  content &&
  content.length > 0 &&
  reducers.reduce((result, next) => next(result), content);

const ArticleSkeleton = ({
  analyticsStream,
  data: article,
  Header,
  logoUrl,
  receiveChildList,
  commentingConfig,
  paidContentClassName,
  isPreview,
  swgProductId,
  additionalRelatedArticlesFlag,
  inlineRelatedArticleOptions,
  algoliaSearchKeys,
  latestFromSectionFlag,
  latestFromSection,
  olympicsKeys,
  getFallbackThumbnailUrl169
}) => {
  const {
    commentsEnabled,
    content,
    dropcapsDisabled,
    id: articleId,
    section,
    url,
    headline,
    shortHeadline,
    label,
    topics,
    relatedArticleSlice,
    template,
    savingEnabled,
    sharingEnabled,
    publishedTime,
    expirableFlags
  } = article;

  const articleContentReducers = [
    insertDropcapIntoAST(template, dropcapsDisabled),
    insertNewsletterPuff(section, isPreview),
    insertNativeAd,
    insertInlineAd,
    insertInlineRelatedArticles(
      relatedArticleSlice,
      inlineRelatedArticleOptions
    ),
    tagLastParagraph
  ];
  const newContent = reduceArticleContent(content, articleContentReducers);

  const HeaderAdContainer = getHeaderAdStyles(template);

  receiveChildList([
    {
      elementId: "last-paragraph",
      name: "end of article",
      eventNavigationName: "Article : View End"
    },
    {
      elementId: "related-articles",
      name: "related articles"
    }
  ]);

  const isLiveOrBreaking = getIsLiveOrBreakingFlag(expirableFlags);

  return (
    <StickyProvider>
      <TrackingContextProvider
        context={{
          component: "ArticleSkeleton",
          attrs: {
            article_name: headline || shortHeadline || "",
            section_details: section
          }
        }}
        analyticsStream={analyticsStream}
      >
        {isPreview && (
          <div className="Container">
            <div className="ArticleMetaBanner">
              <div className="ArticleMetaBanner-field">
                <label htmlFor="ArticleMetaBanner-uuid">
                  UUID
                  <input
                    type="text"
                    placeholder="UUID"
                    name="UUID"
                    id="ArticleMetaBanner-uuid"
                    value={articleId}
                    readOnly
                  />
                </label>
                <button
                  type="button"
                  className="ArticleMetaBanner-button"
                  data-clipboard-target="#ArticleMetaBanner-uuid"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
        <div id="article-marketing-header" />
        <article
          id="article-main"
          data-article-identifier={article.id}
          data-article-sectionname={section}
          data-article-template={template}
        >
          <Head
            article={article}
            logoUrl={logoUrl}
            paidContentClassName={paidContentClassName}
            getFallbackThumbnailUrl169={getFallbackThumbnailUrl169}
            swgProductId={swgProductId}
          />
          <AlgoliaSearchProvider
            algoliaSearchKeys={algoliaSearchKeys}
            article={{ id: articleId, label, section, topics }}
            analyticsStream={analyticsStream}
          >
            <Fragment>
              <HeaderAdContainer key="headerAd">
                <AdContainer slotName="header" style={styles.adMarginStyle} />
              </HeaderAdContainer>
              <MainContainer accessibilityRole="main">
                <HeaderContainer>
                  <Header />
                  {savingEnabled || sharingEnabled ? (
                    <UserState state={UserState.loggedInOrShared}>
                      <MessageContext.Consumer>
                        {({ showMessage }) => (
                          <StickySaveAndShareBar
                            articleId={articleId}
                            articleHeadline={headline}
                            articleUrl={url}
                            onCopyLink={() =>
                              showMessage("Article link copied")
                            }
                            onSaveToMyArticles={() => {}}
                            onShareOnEmail={() => {}}
                            savingEnabled={savingEnabled}
                            sharingEnabled={sharingEnabled}
                          />
                        )}
                      </MessageContext.Consumer>
                    </UserState>
                  ) : null}
                </HeaderContainer>
                <BodyContainer accessibilityRole="article">
                  {newContent && (
                    <ArticleBody
                      analyticsStream={analyticsStream}
                      content={newContent}
                      contextUrl={url}
                      section={section}
                      paidContentClassName={paidContentClassName}
                      template={template}
                      isPreview={isPreview}
                      olympicsKeys={olympicsKeys}
                      isLiveOrBreaking={isLiveOrBreaking}
                    />
                  )}
                  <PaywallPortal
                    id="paywall-portal-article-footer"
                    componentName="subscribe-cta"
                  />
                  <LazyLoad rootMargin={spacing(40)} threshold={0}>
                    {({ observed, registerNode }) => (
                      <ArticleExtras
                        analyticsStream={analyticsStream}
                        articleId={articleId}
                        articleHeadline={headline}
                        articleUrl={url}
                        publishedTime={publishedTime}
                        savingEnabled={savingEnabled}
                        sharingEnabled={sharingEnabled}
                        commentsEnabled={commentsEnabled}
                        registerNode={registerNode}
                        relatedArticleSlice={relatedArticleSlice}
                        relatedArticlesVisible={
                          !!observed.get("related-articles")
                        }
                        commentingConfig={commentingConfig}
                        topics={topics}
                        additionalRelatedArticlesFlag={
                          additionalRelatedArticlesFlag
                        }
                        latestFromSectionFlag={latestFromSectionFlag}
                        latestFromSection={latestFromSection}
                      />
                    )}
                  </LazyLoad>
                </BodyContainer>
              </MainContainer>
            </Fragment>
            <AdContainer slotName="pixel" />
            <AdContainer slotName="pixelteads" />
            <AdContainer slotName="pixelskin" />
          </AlgoliaSearchProvider>
        </article>
      </TrackingContextProvider>
    </StickyProvider>
  );
};

ArticleSkeleton.propTypes = {
  ...articleSkeletonPropTypes,
  paidContentClassName: PropTypes.string
};
ArticleSkeleton.defaultProps = articleSkeletonDefaultProps;

export { KeylineItem, ArticleKeylineItem } from "./keylines";

export { ArticleLink };

export default articleTrackingContext(withTrackScrollDepth(ArticleSkeleton));
