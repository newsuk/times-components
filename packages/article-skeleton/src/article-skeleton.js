import React, { Fragment, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CanShowPuzzleSidebar } from "@times-components/utils";
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
  Banner
} from "@times-components/ts-components";
import { spacing } from "@times-components/ts-styleguide";
import UserState from "@times-components/user-state";
import { MessageContext } from "@times-components/message-bar";
import fetchPolygonData from "./article-sidebar";
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
import { getIsLiveOrBreakingFlag } from "./data-helper";
import setExternalLinkTargets from "./contentModifiers/setExternalLinkTargets";

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

  const sidebarRef = useRef();

  const handleScroll = () => {
    const sidebarNode = sidebarRef.current;
    if (sidebarNode) {
      const adElements = document.querySelectorAll(
        ".responsive__InlineAdWrapper-sc-4v1r4q-17, .responsive__InlineAdWrapper-sc-4v1r4q-14, .responsive__FullWidthImg-sc-4v1r4q-4, .responsive__InteractiveContainer-sc-4v1r4q-2"
      );

      let isAnyAdIntersecting = false;

      adElements.forEach(adElement => {
        if (adElement) {
          const adRect = adElement.getBoundingClientRect();
          const isAdIntersecting =
            adRect.top <= sidebarNode.getBoundingClientRect().bottom &&
            adRect.bottom >= sidebarNode.getBoundingClientRect().top;

          if (isAdIntersecting) {
            isAnyAdIntersecting = true;
          }
        }
      });

      if (isAnyAdIntersecting) {
        sidebarNode.style.opacity = "0";
      } else {
        sidebarNode.style.opacity = "1";
      }
    }
  };

  useEffect(() => {
    const verifyEmailFlag = !!JSON.parse(
      window.sessionStorage.getItem("verifyEmail")
    );
    setShowEmailVerifyBanner(verifyEmailFlag);
  }, []);

  useEffect(() => {
    const sidebarNode = sidebarRef.current;
    if (sidebarNode) {
      sidebarNode.style.transition = "opacity 0.2s ease";
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { hostName, canonicalUrl, breadcrumbs } = articleDataFromRender || {};
  const articleUrl =
    hostName && canonicalUrl ? `${hostName}${canonicalUrl}` : url;

  const articleContentReducers = [
    insertDropcapIntoAST(template, dropcapsDisabled),
    insertNewsletterPuff(section, isPreview, expirableFlags),
    insertInlineAd(isPreview),
    tagLastParagraph,
    setExternalLinkTargets
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
  const [polygonUrl, setPolygonUrl] = useState([]);

  const fetchPolygon = async () => {
    const polygon = await fetchPolygonData();
    setPolygonUrl(polygon);
  };

  useEffect(
    () => {
      if (CanShowPuzzleSidebar(section)) {
        fetchPolygon();
      }
    },
    [CanShowPuzzleSidebar, section]
  );

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
                  <UserState state={UserState.showSaveAndShareBar}>
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
                  </UserState>
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
                  {CanShowPuzzleSidebar(section) && (
                    <SidebarWarpper>
                      <PuzzlesSidebar ref={sidebarRef}>
                        <ArticleSidebar
                          pageLink={`${domainSpecificUrl}/puzzles`}
                          sectionTitle="Puzzles"
                          data={[
                            {
                              title: "Crossword",
                              url: `${domainSpecificUrl}/puzzles/crossword`,
                              imgUrl: `${domainSpecificUrl}/d/img/puzzles/new-illustrations/crossword-c7ae8934ef.png`
                            },
                            {
                              title: "Polygon",
                              url: polygonUrl,
                              imgUrl: `${domainSpecificUrl}/d/img/puzzles/new-illustrations/polygon-875ea55487.png`
                            },
                            {
                              title: "Sudoku",
                              url: `${domainSpecificUrl}/puzzles/sudoku`,
                              imgUrl: `${domainSpecificUrl}/d/img/puzzles/new-illustrations/sudoku-ee2aea0209.png`
                            }
                          ]}
                        />
                      </PuzzlesSidebar>
                    </SidebarWarpper>
                  )}
                  <ArticleContent showMargin={CanShowPuzzleSidebar(section)}>
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

ArticleSkeleton.propTypes = {
  ...articleSkeletonPropTypes,
  paidContentClassName: PropTypes.string
};
ArticleSkeleton.defaultProps = articleSkeletonDefaultProps;

export { KeylineItem, ArticleKeylineItem } from "./keylines";

export { ArticleLink };

export default articleTrackingContext(withTrackScrollDepth(ArticleSkeleton));
