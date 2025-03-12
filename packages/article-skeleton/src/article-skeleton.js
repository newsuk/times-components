import React, { Fragment, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AdContainer } from "@times-components/ad";
import ArticleExtras from "@times-components/article-extras";
import LazyLoad from "@times-components/lazy-load";
import { StickyProvider } from "@times-components/sticky";
import { withTrackScrollDepth } from "@times-components/tracking";
import {
  TrackingContextProvider,
  WelcomeBanner,
  ArticleSidebar,
  UpdateButtonWithDelay,
  Banner,
  SocialEmbedsProvider,
  useSocialEmbedsContext,
  QuizleSidebar
} from "@times-components/ts-components";
import { spacing } from "@times-components/ts-styleguide";
import UserState from "@times-components/user-state";
import { MessageContext } from "@times-components/message-bar";
import { useSidebarLogic } from "./article-sidebar";
import StaticContent from "./static-content";

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
  MainContainer,
  UpdateButtonContainer,
  PuzzlesSidebar,
  SidebarWarpper,
  ArticleWrapper,
  ArticleContent,
  EmailBannerContainer
} from "./styles/responsive";
import styles from "./styles/article-body/index";
import Head from "./head";
import PaywallPortal from "./paywall-portal";
import StickySaveAndShareBar from "./sticky-save-and-share-bar";
import insertDropcapIntoAST from "./contentModifiers/dropcap-util";
import insertNewsletterPuff from "./contentModifiers/newsletter-puff";
import insertInlineAd from "./contentModifiers/inline-ad";
import mapListElements from "./contentModifiers/map-list-elements";
import reorderInteractiveBeforeAd from "./contentModifiers/reorder-interactive-before-ad";
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
  articleDataFromRender,
  paidContentClassName,
  isPreview,
  swgProductId,
  getFallbackThumbnailUrl169,
  zephrDivs,
  showAudioPlayer,
  storefrontConfig
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
    expirableFlags,
    topics,
    relatedArticleSlice,
    template,
    savingEnabled,
    sharingEnabled,
    publishedTime,
    isSavingEnabled,
    isSharingEnabled,
    isCommentEnabled,
    isEntitlementFeatureEnabled
  } = article;

  const [showVerifyEmailBanner, setShowEmailVerifyBanner] = useState(false);

  const { isSocialEmbedAllowed, isAllowedOnce } = useSocialEmbedsContext();

  useEffect(
    () => {
      // Trigger Twitter embed load when isSocialEmbedAllowed or isAllowedOnce switches to true
      if (
        (isSocialEmbedAllowed.twitter || isAllowedOnce.twitter) &&
        window.twttr &&
        window.twttr.widgets
      ) {
        window.twttr.widgets.load();
      }
    },
    [isSocialEmbedAllowed.twitter, isAllowedOnce.twitter]
  );

  useEffect(() => {
    const verifyEmailFlag = !!JSON.parse(
      window.sessionStorage.getItem("verifyEmail")
    );
    setShowEmailVerifyBanner(verifyEmailFlag);
  }, []);

  const {
    hostName,
    canonicalUrl,
    breadcrumbs,
    categorisedArticles,
    deckApiUrl
  } = articleDataFromRender || {};

  const articleUrl =
    hostName && canonicalUrl ? `${hostName}${canonicalUrl}` : url;

  const articleContentReducers = [
    insertDropcapIntoAST(template, dropcapsDisabled),
    insertNewsletterPuff(section, isPreview, expirableFlags),
    insertInlineAd(isPreview),
    tagLastParagraph,
    mapListElements,
    reorderInteractiveBeforeAd
  ];

  const newContent = reduceArticleContent(content, articleContentReducers);

  const HeaderAdContainer = getHeaderAdStyles(template);

  const scrollToTopAndRefresh = window => {
    window.scroll({
      left: 0,
      top: 0
    });
    window.location.reload(true);
  };

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

  const isSharingSavingEnabledExternal = isSavingEnabled || isSharingEnabled;
  const isSharingSavingEnabledByTPA = savingEnabled || sharingEnabled;
  const isSharingSavingEnabled =
    isSharingSavingEnabledByTPA && isSharingSavingEnabledExternal;
  const domainSpecificUrl = hostName || "https://www.thetimes.co.uk";
  const isLiveOrBreaking = getIsLiveOrBreakingFlag(expirableFlags);

  const categoryPath = url ? url.split("/").filter(Boolean)[0] || null : null;
  const quizCategories = ["culture", "life-style"];
  const canShowSidebar = categoryPath
    ? quizCategories.includes(categoryPath)
    : false;

  const [polygonUrl, setPolygonUrl] = useState([]);
  const [quizleSidebarHeight, setQuizleSidebarHeight] = useState();
  const quizleSidebarRef = useRef(null);
  const sidebarRef = useRef();

  useSidebarLogic({
    canShowSidebar,
    categoryPath,
    quizleSidebarRef,
    sidebarRef,
    setPolygonUrl,
    setQuizleSidebarHeight
  });

  const isQuizleSidebar =
    canShowSidebar &&
    categoryPath !== "life-style" &&
    typeof quizleSidebarHeight === "number";
  const sidebarType =
    (isQuizleSidebar && "quizle") || (canShowSidebar && "article") || undefined;

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
        {showVerifyEmailBanner && (
          <EmailBannerContainer>
            <Banner
              title="Check your inbox"
              body="Verify your email by clicking on the link sent to your inbox."
              onClose={() => {
                window.sessionStorage.setItem("verifyEmail", false);
                setShowEmailVerifyBanner(false);
              }}
            />
          </EmailBannerContainer>
        )}
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
          {!!zephrDivs && (
            <StaticContent
              html={'<div id="nu-zephr-article-target-top-head"></div>'}
            />
          )}
          <Head
            article={article}
            articleUrl={articleUrl}
            logoUrl={logoUrl}
            paidContentClassName={paidContentClassName}
            getFallbackThumbnailUrl169={getFallbackThumbnailUrl169}
            swgProductId={swgProductId}
            breadcrumbs={breadcrumbs}
            domainSpecificUrl={domainSpecificUrl}
          />
          {!!zephrDivs && (
            <StaticContent
              html={'<div id="nu-zephr-article-target-below-head"></div>'}
            />
          )}
          <Fragment>
            <HeaderAdContainer key="headerAd">
              <AdContainer slotName="header" style={styles.adMarginStyle} />
            </HeaderAdContainer>
            <MainContainer>
              <WelcomeBanner />
              {!!zephrDivs && (
                <StaticContent
                  html={
                    '<div id="nu-zephr-article-target-top-maincontainer"></div>'
                  }
                />
              )}
              <HeaderContainer showAudioPlayer={showAudioPlayer}>
                {!!zephrDivs && (
                  <StaticContent
                    html={
                      '<div id="nu-zephr-article-target-top-headercontainer"></div>'
                    }
                  />
                )}
                <Header />
                {isSharingSavingEnabled ? (
                  <MessageContext.Consumer>
                    {({ showMessage }) => (
                      <StickySaveAndShareBar
                        articleId={articleId}
                        articleHeadline={headline}
                        articleUrl={articleUrl}
                        onCopyLink={() => showMessage("Article link copied")}
                        onSaveToMyArticles={() => {}}
                        onShareOnEmail={() => {}}
                        savingEnabled={savingEnabled}
                        sharingEnabled={sharingEnabled}
                        hostName={domainSpecificUrl}
                      />
                    )}
                  </MessageContext.Consumer>
                ) : null}
                {!!zephrDivs && (
                  <StaticContent
                    html={
                      '<div id="nu-zephr-article-target-bottom-headercontainer"></div>'
                    }
                  />
                )}
              </HeaderContainer>
              <BodyContainer>
                <ArticleWrapper>
                  {canShowSidebar && (
                    <SidebarWarpper>
                      <PuzzlesSidebar ref={sidebarRef}>
                        {categoryPath === "life-style" ? (
                          <ArticleSidebar
                            pageLink={`${domainSpecificUrl}/puzzles`}
                            sectionTitle="Puzzles"
                            data={[
                              {
                                title: "Crossword",
                                url: `${domainSpecificUrl}/puzzles/crossword`,
                                imgUrl: `https://www.thetimes.com/d/img/puzzles/new-illustrations/crossword-c7ae8934ef.png`
                              },
                              {
                                title: "Polygon",
                                url: polygonUrl,
                                imgUrl: `https://www.thetimes.com/d/img/puzzles/new-illustrations/polygon-875ea55487.png`
                              },
                              {
                                title: "Sudoku",
                                url: `${domainSpecificUrl}/puzzles/sudoku`,
                                imgUrl: `https://www.thetimes.com/d/img/puzzles/new-illustrations/sudoku-ee2aea0209.png`
                              }
                            ]}
                          />
                        ) : (
                          <div ref={quizleSidebarRef}>
                            <QuizleSidebar
                              pageLink={`${domainSpecificUrl}/quizle`}
                              sectionTitle="Today's Quizle"
                            />
                          </div>
                        )}
                      </PuzzlesSidebar>
                    </SidebarWarpper>
                  )}
                  <ArticleContent
                    sidebarType={sidebarType}
                    dynamicMargin={
                      isQuizleSidebar ? quizleSidebarHeight : undefined
                    }
                    data-testid={sidebarType}
                  >
                    {!!zephrDivs && (
                      <StaticContent
                        html={
                          '<div id="nu-zephr-article-target-top-bodycontainer"></div>'
                        }
                      />
                    )}
                    {newContent && (
                      <ArticleBody
                        id={article.id}
                        analyticsStream={analyticsStream}
                        content={newContent}
                        contextUrl={articleUrl}
                        section={section}
                        articleHeadline={headline}
                        paidContentClassName={paidContentClassName}
                        template={template}
                        isPreview={isPreview}
                        isLiveOrBreaking={isLiveOrBreaking}
                        deckApiUrl={deckApiUrl}
                      />
                    )}
                    {isLiveOrBreaking && (
                      <UserState state={UserState.showLiveUpdateButton}>
                        <UpdateButtonContainer data-testid="Update button container">
                          <UpdateButtonWithDelay
                            delay={8000}
                            update
                            display
                            label="New update"
                            handleClick={() => scrollToTopAndRefresh(window)}
                            updatedTime={article.publishedTime}
                            articleId={article.id}
                          />
                        </UpdateButtonContainer>
                      </UserState>
                    )}
                    <PaywallPortal
                      id="paywall-portal-article-footer"
                      componentName="subscribe-cta"
                    >
                      {!!zephrDivs && (
                        <StaticContent
                          html={
                            '<div id="nu-zephr-article-target-paywall"></div>'
                          }
                        />
                      )}
                    </PaywallPortal>
                  </ArticleContent>
                </ArticleWrapper>
                <LazyLoad rootMargin={spacing(40)} threshold={0}>
                  {({ observed, registerNode }) => (
                    <ArticleExtras
                      analyticsStream={analyticsStream}
                      articleId={articleId}
                      articleHeadline={headline}
                      articleUrl={articleUrl}
                      section={section}
                      publishedTime={publishedTime}
                      savingEnabled={savingEnabled}
                      sharingEnabled={sharingEnabled}
                      commentsEnabled={commentsEnabled}
                      registerNode={registerNode}
                      relatedArticleSlice={relatedArticleSlice}
                      categorisedArticles={categorisedArticles}
                      relatedArticlesVisible={
                        !!observed.get("related-articles")
                      }
                      commentingConfig={commentingConfig}
                      topics={topics}
                      isSharingSavingEnabled={isSharingSavingEnabled}
                      isCommentEnabled={isCommentEnabled}
                      storefrontConfig={storefrontConfig}
                      breadcrumbs={breadcrumbs}
                      domainSpecificUrl={domainSpecificUrl}
                      isEntitlementFeatureEnabled={isEntitlementFeatureEnabled}
                    />
                  )}
                </LazyLoad>
                {!!zephrDivs && (
                  <StaticContent
                    html={
                      '<div id="nu-zephr-article-target-bottom-bodycontainer"></div>'
                    }
                  />
                )}
              </BodyContainer>
              {!!zephrDivs && (
                <StaticContent
                  html={
                    '<div id="nu-zephr-article-target-bottom-maincontainer"></div>'
                  }
                />
              )}
            </MainContainer>
          </Fragment>
          <AdContainer slotName="pixel" />
          <AdContainer slotName="pixelteads" />
          <AdContainer slotName="pixelskin" />
        </article>
      </TrackingContextProvider>
    </StickyProvider>
  );
};

const ArticleSkeletonWithProvider = props => (
  <SocialEmbedsProvider>
    <ArticleSkeleton {...props} />
  </SocialEmbedsProvider>
);

ArticleSkeleton.propTypes = {
  ...articleSkeletonPropTypes,
  paidContentClassName: PropTypes.string
};
ArticleSkeleton.defaultProps = articleSkeletonDefaultProps;

export { KeylineItem, ArticleKeylineItem } from "./keylines";

export { ArticleLink };

export default articleTrackingContext(
  withTrackScrollDepth(ArticleSkeletonWithProvider)
);
