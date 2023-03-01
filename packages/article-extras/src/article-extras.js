import React from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import ArticleComments from "@times-components/article-comments";
import RelatedArticles from "@times-components/related-articles";
import { MessageContext } from "@times-components/message-bar";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import { RecommendedFetch } from "@times-components/ts-components";

import ArticleTopics from "./article-topics";
import { ShareAndSaveContainer } from "./styles/responsive";

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
  isCommentEnabledFromZephr
}) => {
  /* Nativo insert Sponsored Articles after the div#sponsored-article element. They are not able to insert directly into that element hence the container div */
  const sponsoredArticlesAndRelatedArticles = isRecommendedActive => (
    <>
      <div id="related-articles" ref={node => registerNode(node)}>
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
        isCommentEnabledFromZephr={isCommentEnabledFromZephr}
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
  isCommentEnabledFromZephr: PropTypes.bool
};

ArticleExtras.defaultProps = {
  relatedArticleSlice: null,
  topics: null,
  isSharingSavingEnabled: true,
  isCommentEnabledFromZephr: true
};

export default ArticleExtras;
