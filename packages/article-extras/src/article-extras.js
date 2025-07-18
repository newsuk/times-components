import React from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import ArticleComments from "@times-components/article-comments";
import RelatedArticles from "@times-components/related-articles";
import { MessageContext } from "@times-components/message-bar";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import {
  RecommendedFetch,
  Breadcrumb,
  CategorisedArticles
} from "@times-components/ts-components";

import ArticleTopics from "./article-topics";
import {
  BreadcrumbContainer,
  ShareAndSaveContainer
} from "./styles/responsive";
import {
  PromotedContentContainer,
  PromotedContentTitle,
  PromotedContentGrid,
  PromotedContentAd,
  PromotedContentSectionDivider
} from "./styles";

const clearingStyle = {
  clear: "both"
};

const ArticleExtras = ({
  analyticsStream,
  articleId,
  commentsEnabled,
  commentsSortOrder,
  registerNode,
  savingEnabled,
  sharingEnabled,
  articleUrl,
  section,
  articleHeadline,
  relatedArticleSlice,
  categorisedArticles,
  relatedArticlesVisible,
  commentingConfig,
  isNewCommentingBannerEnabled,
  topics,
  breadcrumbs,
  domainSpecificUrl,
  isExcludedFromAdsPathFromServer
}) => {
  const renderBreadcrumb = ({ showBorder } = { showBorder: false }) => {
    if (breadcrumbs && breadcrumbs.length > 0) {
      return (
        <BreadcrumbContainer $border={showBorder}>
          <Breadcrumb data={breadcrumbs} />
        </BreadcrumbContainer>
      );
    }

    return null;
  };
  const categoryArticles =
    (categorisedArticles && categorisedArticles.categoryArticles) || null;
  const parentCategoryArticles =
    (categorisedArticles && categorisedArticles.parentCategoryArticles) || null;

  /* Nativo insert Sponsored Articles after the div#sponsored-article element. They are not able to insert directly into that element hence the container div */
  const sponsoredArticlesAndRelatedArticles = (
    isRecommendedActive,
    showBreadcrumbs
  ) => (
    <>
      <div id="related-articles" ref={node => registerNode(node)}>
        {showBreadcrumbs && renderBreadcrumb({ showBorder: false })}
        <RelatedArticles
          analyticsStream={analyticsStream}
          isVisible={relatedArticlesVisible}
          slice={relatedArticleSlice}
          hideBorder={!isRecommendedActive && Boolean(categoryArticles)}
        />
        {isRecommendedActive && (
          <RecommendedFetch
            articleId={articleId}
            articleHeadline={articleHeadline}
            articleSection={section}
          />
        )}
        {!isRecommendedActive &&
          categoryArticles && (
            <CategorisedArticles
              heading={categoryArticles.label}
              articles={categoryArticles.articles}
            />
          )}
        {!isRecommendedActive &&
          parentCategoryArticles && (
            <CategorisedArticles
              heading={parentCategoryArticles.label}
              articles={parentCategoryArticles.articles}
            />
          )}
      </div>
      {!isExcludedFromAdsPathFromServer && (
        <PromotedContentContainer>
          <PromotedContentTitle>PROMOTED CONTENT</PromotedContentTitle>
          <PromotedContentGrid>
            <PromotedContentAd id="advert-inarticle-native-1" />
            <PromotedContentAd id="advert-inarticle-native-2" />
            <PromotedContentSectionDivider />
            <PromotedContentAd id="advert-inarticle-native-3" />
            <PromotedContentAd id="advert-inarticle-native-4" />
          </PromotedContentGrid>
        </PromotedContentContainer>
      )}
    </>
  );
  return (
    <UserState
      state={UserState.showArticleExtras}
      fallback={sponsoredArticlesAndRelatedArticles(false, true)}
    >
      <div style={clearingStyle} />
      {renderBreadcrumb({ showBorder: topics && topics.length > 0 })}
      <ArticleTopics topics={topics} />
      {(savingEnabled || sharingEnabled) && (
        <UserState state={UserState.showSaveAndShareBar}>
          <MessageContext.Consumer>
            {({ showMessage }) => (
              <ShareAndSaveContainer showBottomBorder={!relatedArticleSlice}>
                <SaveAndShareBar
                  articleId={articleId}
                  articleHeadline={articleHeadline}
                  articleUrl={articleUrl}
                  onCopyLink={() => showMessage("Article link copied")}
                  onSaveToMyArticles={() => {}}
                  onShareOnEmail={() => {}}
                  savingEnabled={savingEnabled}
                  sharingEnabled={sharingEnabled}
                />
              </ShareAndSaveContainer>
            )}
          </MessageContext.Consumer>
        </UserState>
      )}
      {sponsoredArticlesAndRelatedArticles(true, false)}
      <ArticleComments
        articleId={articleId}
        isEnabled={commentsEnabled}
        commentsSortOrder={commentsSortOrder}
        commentingConfig={commentingConfig}
        isNewCommentingBannerEnabled={isNewCommentingBannerEnabled}
        domainSpecificUrl={domainSpecificUrl}
      />
    </UserState>
  );
};

ArticleExtras.propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  articleUrl: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  articleHeadline: PropTypes.string.isRequired,
  commentsEnabled: PropTypes.bool.isRequired,
  commentsSortOrder: PropTypes.string,
  registerNode: PropTypes.func.isRequired,
  relatedArticleSlice: PropTypes.shape({}),
  categorisedArticles: PropTypes.shape({}),
  relatedArticlesVisible: PropTypes.bool.isRequired,
  commentingConfig: PropTypes.shape({
    account: PropTypes.string.isRequired
  }).isRequired,
  isNewCommentingBannerEnabled: PropTypes.bool,
  topics: PropTypes.arrayOf(PropTypes.shape({})),
  savingEnabled: PropTypes.bool.isRequired,
  sharingEnabled: PropTypes.bool.isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  domainSpecificUrl: PropTypes.string.isRequired,
  isExcludedFromAdsPathFromServer: PropTypes.bool
};

ArticleExtras.defaultProps = {
  relatedArticleSlice: null,
  categorisedArticles: null,
  commentsSortOrder: null,
  topics: null,
  breadcrumbs: [],
  isExcludedFromAdsPathFromServer: false,
  isNewCommentingBannerEnabled: PropTypes.bool
};

export default ArticleExtras;
