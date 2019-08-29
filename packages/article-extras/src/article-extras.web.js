import React from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import ArticleComments from "@times-components/article-comments";
import RelatedArticles from "@times-components/related-articles";
import { MessageContext } from "@times-components/message-bar";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import ArticleTopics from "./article-topics";
import { ShareAndSaveContainer } from "./styles/responsive";

const ArticleExtras = ({
  analyticsStream,
  articleId,
  commentsEnabled,
  registerNode,
  savingEnabled,
  sharingEnabled,
  articleUrl,
  articleHeadline,
  relatedArticleSlice,
  relatedArticlesVisible,
  spotAccountId,
  topics
}) => (
  <UserState state={UserState.fullArticle}>
    <ArticleTopics topics={topics} />
    {(savingEnabled || sharingEnabled) && (
      <UserState state={UserState.loggedInOrShared}>
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
    <div id="related-articles" ref={node => registerNode(node)}>
      <RelatedArticles
        analyticsStream={analyticsStream}
        isVisible={relatedArticlesVisible}
        slice={relatedArticleSlice}
      />
    </div>
    {/* Nativo inserts Sponsored Articles in this div */}
    <div id="sponsored-article" />
    <ArticleComments
      articleId={articleId}
      isEnabled={commentsEnabled}
      spotAccountId={spotAccountId}
    />
  </UserState>
);

ArticleExtras.propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  articleUrl: PropTypes.string.isRequired,
  articleHeadline: PropTypes.string.isRequired,
  commentsEnabled: PropTypes.bool.isRequired,
  registerNode: PropTypes.func.isRequired,
  relatedArticleSlice: PropTypes.shape({}),
  relatedArticlesVisible: PropTypes.bool.isRequired,
  spotAccountId: PropTypes.string,
  topics: PropTypes.arrayOf(PropTypes.shape({})),
  savingEnabled: PropTypes.bool.isRequired,
  sharingEnabled: PropTypes.bool.isRequired
};

ArticleExtras.defaultProps = {
  relatedArticleSlice: null,
  spotAccountId: null,
  topics: null
};

export default ArticleExtras;
