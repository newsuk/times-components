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
  const renderBreadcrumb = ({ showBorder } = { showBorder: false }) => (
    <>
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <BreadcrumbContainer $border={showBorder}>
          <Breadcrumb data={breadcrumbs} />
        </BreadcrumbContainer>
      ) : (
        // Returning empty div to workaround React.children prop-type error
        <div />
      )}
    </>
  );

  /* Nativo insert Sponsored Articles after the div#sponsored-article element. They are not able to insert directly into that element hence the container div */
  const sponsoredArticlesAndRelatedArticles = isRecommendedActive => (
    <>
      <div id="related-articles" ref={node => registerNode(node)}>
        {!isRecommendedActive && renderBreadcrumb()}
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
      <div id="sponsored-article-container">
        <div id="sponsored-article" />
      </div>
    </>
  );
  return (
    <UserState
      state={UserState.showArticleExtras}
      fallback={sponsoredArticlesAndRelatedArticles(false)}
    >
      <div style={clearingStyle} />
      {renderBreadcrumb({ showBorder: true })}
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
      {sponsoredArticlesAndRelatedArticles(true)}
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
