import React from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import ArticleComments from "@times-components/article-comments";
import RelatedArticles from "@times-components/related-articles";
import { MessageContext } from "@times-components/message-bar";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import { RecommendedFetch } from "@times-components/ts-components";
import { Breadcrumb } from "@times-components/ts-newskit";

import ArticleTopics from "./article-topics";
import {
  BreadcrumbContainer,
  ShareAndSaveContainer
} from "./styles/responsive";
import { NativeAd,
  NativeAdTitle,
  Ad,} from "./styles"

const clearingStyle = {
  clear: "both"
};

const ArticleExtras = ({
  analyticsStream,
  articleId,
  commentsEnabled,
  registerNode,
  savingEnabled,
  sharingEnabled,
  articleUrl,
  section,
  articleHeadline,
  relatedArticleSlice,
  relatedArticlesVisible,
  commentingConfig,
  topics,
  isSharingSavingEnabled,
  isCommentEnabled,
  storefrontConfig,
  breadcrumbs
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
        />
        {isRecommendedActive && (
          <RecommendedFetch
            articleId={articleId}
            articleHeadline={articleHeadline}
            articleSection={section}
          />
        )}
      </div>
      <NativeAd className="group-3 hidden" key="1">
        <NativeAdTitle>Sponsored</NativeAdTitle>
        <Ad id="advert-inarticle-native-1" data-parent="group-3" />
        <Ad id="advert-inarticle-native-2" data-parent="group-3" />
      </NativeAd>
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
      {isSharingSavingEnabled && (
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
        commentingConfig={commentingConfig}
        isCommentEnabled={isCommentEnabled}
        storefrontConfig={storefrontConfig}
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
  registerNode: PropTypes.func.isRequired,
  relatedArticleSlice: PropTypes.shape({}),
  relatedArticlesVisible: PropTypes.bool.isRequired,
  commentingConfig: PropTypes.shape({
    account: PropTypes.string.isRequired
  }).isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape({})),
  savingEnabled: PropTypes.bool.isRequired,
  sharingEnabled: PropTypes.bool.isRequired,
  isSharingSavingEnabled: PropTypes.bool,
  isCommentEnabled: PropTypes.bool,
  storefrontConfig: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({}))
};

ArticleExtras.defaultProps = {
  relatedArticleSlice: null,
  topics: null,
  isSharingSavingEnabled: true,
  isCommentEnabled: true,
  breadcrumbs: []
};

export default ArticleExtras;
