import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { AdContainer } from "@times-components/ad";
import ArticleExtras from "@times-components/article-extras";
import LazyLoad from "@times-components/lazy-load";
import { spacing } from "@times-components/styleguide";
import { StickyProvider } from "@times-components/sticky";
import { withTrackScrollDepth } from "@times-components/tracking";
import UserState from "@times-components/user-state";
import { MessageContext } from "@times-components/message-bar";
import ArticleBody, { ArticleLink } from "./article-body/article-body";
import {
  articleSkeletonDefaultProps,
  articleSkeletonPropTypes
} from "./article-skeleton-prop-types";
import articleTrackingContext from "./tracking/article-tracking-context";
import insertDropcapIntoAST from "./dropcap-util";
import {
  BodyContainer,
  getHeaderAdStyles,
  HeaderContainer,
  MainContainer
} from "./styles/responsive";
import styles from "./styles/article-body/index.web";
import Head from "./head";
import PaywallPortal from "./paywall-portal";
import StickySaveAndShareBar from "./sticky-save-and-share-bar";

const ArticleSkeleton = ({
  analyticsStream,
  data: article,
  Header,
  logoUrl,
  receiveChildList,
  spotAccountId,
  paidContentClassName,
  isPreview
}) => {
  const {
    commentsEnabled,
    content,
    dropcapsDisabled,
    id: articleId,
    section,
    url,
    headline,
    topics,
    relatedArticleSlice,
    template,
    savingEnabled,
    sharingEnabled
  } = article;

  const newContent =
    content &&
    content.length > 0 &&
    insertDropcapIntoAST(content, template, dropcapsDisabled);

  const HeaderAdContainer = getHeaderAdStyles(template);

  receiveChildList([
    {
      elementId: "related-articles",
      name: "related articles"
    }
  ]);
  return (
    <StickyProvider>
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
        />
        <Fragment>
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
                          onCopyLink={() => showMessage("Article link copied")}
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
                    content={newContent}
                    contextUrl={url}
                    section={section}
                    paidContentClassName={paidContentClassName}
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
                      savingEnabled={savingEnabled}
                      sharingEnabled={sharingEnabled}
                      commentsEnabled={commentsEnabled}
                      registerNode={registerNode}
                      relatedArticleSlice={relatedArticleSlice}
                      relatedArticlesVisible={
                        !!observed.get("related-articles")
                      }
                      spotAccountId={spotAccountId}
                      topics={topics}
                    />
                  )}
                </LazyLoad>
              </BodyContainer>
            </MainContainer>
          </Fragment>
          <AdContainer slotName="pixel" />
          <AdContainer slotName="pixelteads" />
          <AdContainer slotName="pixelskin" />
        </Fragment>
      </article>
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
