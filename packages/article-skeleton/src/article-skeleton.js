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
import SaveAndShareBar from "@times-components/save-and-share-bar";
import { fetchPolygonData, fetchSidebarData } from "./article-sidebar";
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
import removeContentFromTeaserPage from "./contentModifiers/teaser-content";
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
  Content,
  ContentFooter,
  logoUrl,
  receiveChildList,
  commentingConfig,
  isNewCommentingBannerEnabled,
  articleDataFromRender,
  paidContentClassName,
  isPreview,
  swgProductId,
  getFallbackThumbnailUrl169,
  zephrDivs,
  showAudioPlayer,
  removeTeaserContent
}) => {
  const {
    commentsEnabled,
    commentsSortOrder,
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
    publishedTime
  } = article;

  console.log('dataTC', data)
  /* console.log('ARTICLE-TC', article) */

  const [showVerifyEmailBanner, setShowEmailVerifyBanner] = useState(false);

  const { isSocialEmbedAllowed, isAllowedOnce } = useSocialEmbedsContext();

  useEffect(
    () => {
      // Trigger Instagram embed refresh when isSocialEmbedAllowed or isAllowedOnce switches to true
      if (
        window.instgrm &&
        window.instgrm.Embeds &&
        typeof window.instgrm.Embeds.process === "function"
      ) {
        window.instgrm.Embeds.process();
      }
    },
    [isSocialEmbedAllowed.instagram, isAllowedOnce.instagram]
  );

 useEffect(() => {
  if (typeof window !== "undefined") {
    window.utag_data = window.utag_data || {};

    window.utag_data.page_section = publishedTime

    console.log("Updated utag_data", window.utag_data);
  }
}, [page_section]);
    

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

  const {
    hostName,
    canonicalUrl,
    breadcrumbs,
    categorisedArticles,
    deckApiUrl,
    isExcludedFromAdsPathFromServer,
    firstPublishedTime,
    isLiveArticleMetaDataEnabled
  } = articleDataFromRender || {};

  const articleUrl =
    hostName && canonicalUrl ? `${hostName}${canonicalUrl}` : url;

  const categoryPath = url ? url.split("/").filter(Boolean)[0] || null : null;
  const quizCategories = ["culture", "life-style"];
  const canShowSidebar = categoryPath
    ? quizCategories.includes(categoryPath)
    : false;

  const articleContentReducers = [
    removeContentFromTeaserPage(removeTeaserContent),
    insertDropcapIntoAST(template, dropcapsDisabled),
    insertNewsletterPuff(section, isPreview, expirableFlags),
    insertInlineAd(isPreview),
    tagLastParagraph,
    mapListElements,
    reorderInteractiveBeforeAd
  ];

  const newContent = reduceArticleContent(content, articleContentReducers);
  const isLiveOrBreaking = getIsLiveOrBreakingFlag(expirableFlags);

  const rendererdContent = newContent && (
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
      isExcludedFromAdsPathFromServer={isExcludedFromAdsPathFromServer}
    />
  );

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

  const domainSpecificUrl = hostName || "https://www.thetimes.co.uk";

  const SaveAndShare = (
    <UserState state={UserState.showSaveAndShareBar}>
      <MessageContext.Consumer>
        {({ showMessage }) => {
          const saveShareProps = {
            articleId,
            articleHeadline: headline,
            articleUrl,
            onCopyLink: () => showMessage("Article link copied"),
            onSaveToMyArticles: () => {},
            onShareOnEmail: () => {},
            savingEnabled,
            sharingEnabled,
            hostName: domainSpecificUrl
          };
          return Content ? (
            <SaveAndShareBar {...saveShareProps} />
          ) : (
            <StickySaveAndShareBar {...saveShareProps} />
          );
        }}
      </MessageContext.Consumer>
    </UserState>
  );

  const [polygonUrl, setPolygonUrl] = useState([]);
  const [sidebarData, setSidebarData] = useState(null);

  const fetchPolygon = async () => {
    const polygon = await fetchPolygonData();
    setPolygonUrl(polygon);
  };

  useEffect(
    () => {
      if (canShowSidebar) {
        fetchPolygon();
      }
    },
    [canShowSidebar]
  );

  useEffect(() => {
    const loadSidebarData = async () => {
      const data = await fetchSidebarData();
      setSidebarData(data);
    };

    loadSidebarData();
  }, []);

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
            firstPublishedTime={firstPublishedTime}
            isLiveArticleMetaDataEnabled={isLiveArticleMetaDataEnabled}
          />
          {!!zephrDivs && (
            <StaticContent
              html={'<div id="nu-zephr-article-target-below-head"></div>'}
            />
          )}
          {Content ? (
            <Content content={rendererdContent} SaveAndShare={SaveAndShare} />
          ) : (
            <Fragment>
              {!isExcludedFromAdsPathFromServer && (
                <HeaderAdContainer key="headerAd">
                  <AdContainer slotName="header" style={styles.adMarginStyle} />
                </HeaderAdContainer>
              )}
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
                  {SaveAndShare}
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
                          {categoryPath === "life-style" &&
                          Array.isArray(sidebarData) &&
                          sidebarData.length > 0 ? (
                            <ArticleSidebar
                              pageLink={`${domainSpecificUrl}/puzzles`}
                              sectionTitle="Puzzles"
                              data={sidebarData.map(item => ({
                                title: item.name,
                                url:
                                  item.type === "polygon"
                                    ? polygonUrl
                                    : item.link ||
                                      `${domainSpecificUrl}/puzzles/${
                                        item.type
                                      }`,
                                imgUrl: item.image
                              }))}
                            />
                          ) : (
                            <QuizleSidebar
                              pageLink={`${domainSpecificUrl}/quizle`}
                              sectionTitle="Today's Quizle"
                            />
                          )}
                        </PuzzlesSidebar>
                      </SidebarWarpper>
                    )}
                    <ArticleContent showMargin={canShowSidebar}>
                      {!!zephrDivs && (
                        <StaticContent
                          html={
                            '<div id="nu-zephr-article-target-top-bodycontainer"></div>'
                          }
                        />
                      )}
                      {rendererdContent}
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
                  {!removeTeaserContent && (
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
                          commentsSortOrder={commentsSortOrder}
                          registerNode={registerNode}
                          relatedArticleSlice={relatedArticleSlice}
                          categorisedArticles={categorisedArticles}
                          relatedArticlesVisible={
                            !!observed.get("related-articles")
                          }
                          commentingConfig={commentingConfig}
                          isNewCommentingBannerEnabled={
                            isNewCommentingBannerEnabled
                          }
                          topics={topics}
                          breadcrumbs={breadcrumbs}
                          domainSpecificUrl={domainSpecificUrl}
                          isExcludedFromAdsPathFromServer={
                            isExcludedFromAdsPathFromServer
                          }
                        />
                      )}
                    </LazyLoad>
                  )}
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
          )}
          {ContentFooter && <ContentFooter />}
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
export {
  InlineAdWrapper,
  InlineAdTitle
} from "./styles/article-body/responsive";

export { ArticleLink };

export default articleTrackingContext(
  withTrackScrollDepth(ArticleSkeletonWithProvider)
);
