import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import ArticleComments from "@times-components/article-comments";
import RelatedArticles from "@times-components/related-articles";
import { MessageContext } from "@times-components/message-bar";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import { RecommendedFetch, Breadcrumb } from "@times-components/ts-components";

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
import ShareSaveEntitlementState from "./share-save-entitlement-state";

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
  breadcrumbs,
  domainSpecificUrl,
  isEntitlementFeatureEnabled,
  isSharingSavingEntitlementEnabled
}) => {

  const [shareSaveEntitlementData, setShareSaveEntitlementData] = useState(undefined);

  useEffect(
    () => {
      const fetchUserEntitlements = async () => {
        const response = await fetch("/api/get-user-entitlements");
        const data = await response.json();
        console.log("fetchUserEntitlements", data);
        setShareSaveEntitlementData(data);
      };

      if (typeof window !== "undefined" && isSharingSavingEntitlementEnabled) {
        fetchUserEntitlements();
      }
    },
    [isSharingSavingEntitlementEnabled]
  );

  console.log("shareSaveEntitlementData", shareSaveEntitlementData);

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
    </>
  );
  const renderSaveAndShareBar = () => (
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
            isSharingSavingEntitlementEnabled={isSharingSavingEntitlementEnabled}
          />
        </ShareAndSaveContainer>
      )}
    </MessageContext.Consumer>
  );

  return (
    <UserState
      state={UserState.showArticleExtras}
      fallback={sponsoredArticlesAndRelatedArticles(false, true)}
    >
      <div style={clearingStyle} />
      {renderBreadcrumb({ showBorder: topics && topics.length > 0 })}
      <ArticleTopics topics={topics} />
      {isSharingSavingEntitlementEnabled ? 
        (isSharingSavingEnabled && (
          <UserState state={UserState.showSaveAndShareBar}>
            {renderSaveAndShareBar()}
          </UserState>
      )):
      <ShareSaveEntitlementState shareSaveEntitlementData={shareSaveEntitlementData}>
        {renderSaveAndShareBar()}
      </ShareSaveEntitlementState>
      }
      {sponsoredArticlesAndRelatedArticles(true, false)}
      <ArticleComments
        articleId={articleId}
        isEnabled={commentsEnabled}
        commentingConfig={commentingConfig}
        isCommentEnabled={isCommentEnabled}
        storefrontConfig={storefrontConfig}
        domainSpecificUrl={domainSpecificUrl}
        isEntitlementFeatureEnabled={isEntitlementFeatureEnabled}
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
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  domainSpecificUrl: PropTypes.string.isRequired,
  isEntitlementFeatureEnabled: PropTypes.bool.isRequired,
  isSharingSavingEntitlementEnabled: PropTypes.bool.isRequired
};

ArticleExtras.defaultProps = {
  relatedArticleSlice: null,
  topics: null,
  isSharingSavingEnabled: true,
  isCommentEnabled: true,
  breadcrumbs: []
};

export default ArticleExtras;
