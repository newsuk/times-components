import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import ArticleComments from "@times-components/article-comments";
import RelatedArticles from "@times-components/related-articles";
import { MessageContext } from "@times-components/message-bar";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import {
  RelatedArticleSlice,
  LatestFromSection,
  useAlgoliaSearch
} from "@times-components/ts-components";

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
  articleHeadline,
  relatedArticleSlice,
  relatedArticlesVisible,
  spotAccountId,
  topics,
  additionalRelatedArticlesFlag,
  latestFromSectionFlag,
  latestFromSection
}) => {
  const [
    algoliaRelatedArticleSlice,
    setAlgoliaRelatedArticleSlice
  ] = useState();

  const { getRelatedArticles } = useAlgoliaSearch();

  useMemo(
    async () => {
      if (additionalRelatedArticlesFlag) {
        const data = await getRelatedArticles();
        if (data) setAlgoliaRelatedArticleSlice(data);
      }
    },
    [additionalRelatedArticlesFlag, getRelatedArticles]
  );

  /* Nativo insert Sponsored Articles after the div#sponsored-article element. They are not able to insert directly into that element hence the container div */
  const sponsoredArticles = (
    <div id="sponsored-article-container">
      <div id="sponsored-article" />
    </div>
  );

  return (
    <UserState state={UserState.fullArticle} fallback={sponsoredArticles}>
      <div style={clearingStyle} />
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
        {latestFromSectionFlag &&
          latestFromSection && (
            <LatestFromSection
              latestFromSection={latestFromSection}
              analyticsStream={analyticsStream}
            />
          )}
        <RelatedArticleSlice
          heading="Related Articles"
          analyticsStream={analyticsStream}
          slice={relatedArticleSlice}
        />
        {additionalRelatedArticlesFlag &&
          algoliaRelatedArticleSlice && (
            <RelatedArticles
              // heading="Additional Featured Articles"
              heading={`AlgoliaSearch "${algoliaRelatedArticleSlice.query}"`}
              analyticsStream={analyticsStream}
              isVisible={relatedArticlesVisible}
              slice={algoliaRelatedArticleSlice}
            />
          )}
      </div>
      {sponsoredArticles}

      <UserState
        state={UserState.loggedIn}
        fallback={
          <ArticleComments
            articleId={articleId}
            isEnabled={commentsEnabled}
            spotAccountId={spotAccountId}
            isReadOnly
          />
        }
      >
        <ArticleComments
          articleId={articleId}
          isEnabled={commentsEnabled}
          spotAccountId={spotAccountId}
        />
      </UserState>
    </UserState>
  );
};

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
  sharingEnabled: PropTypes.bool.isRequired,
  additionalRelatedArticlesFlag: PropTypes.bool.isRequired,
  latestFromSectionFlag: PropTypes.bool.isRequired,
  latestFromSection: PropTypes.shape({})
};

ArticleExtras.defaultProps = {
  relatedArticleSlice: null,
  spotAccountId: null,
  topics: null,
  latestFromSection: null
};

export default ArticleExtras;
