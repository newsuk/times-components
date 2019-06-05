import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Ad, { AdComposer } from "@times-components/ad";
import ArticleExtras from "@times-components/article-extras";
import LazyLoad from "@times-components/lazy-load";
import { spacing } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
import {
  isLoggedIn,
  isMeteredExpired,
  isShared,
  ClientUserStateConsumer
} from "@times-components/utils";
import { MessageContext } from "@times-components/message-bar";
import ArticleBody from "./article-body/article-body";
import {
  articleSkeletonDefaultProps,
  articleSkeletonPropTypes
} from "./article-skeleton-prop-types";
import articleTrackingContext from "./article-tracking-context";
import insertDropcapIntoAST from "./dropcap-util";
import {
  BodyContainer,
  HeaderAdContainer,
  MainContainer
} from "./styles/responsive";
import Head from "./head";
import StickySaveAndShareBar from "./sticky-save-and-share-bar";

const adStyle = {
  marginBottom: 0
};

function isNonExpiredUser(user) {
  return isLoggedIn(user) && !isMeteredExpired(user);
}

function shouldShowFullArticle(user) {
  return isShared(user) || isNonExpiredUser(user);
}

class ArticleSkeleton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleWidth: null
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      articleWidth: this.node && this.node.clientWidth
    });
  }

  render() {
    const {
      adConfig,
      analyticsStream,
      data: article,
      Header,
      receiveChildList,
      saveApi,
      spotAccountId,
      paidContentClassName
    } = this.props;

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

    const { articleWidth } = this.state;
    const newContent = [...content];

    if (newContent && newContent.length > 0) {
      newContent[0] = insertDropcapIntoAST(
        newContent[0],
        template,
        dropcapsDisabled
      );
    }

    receiveChildList([
      {
        elementId: "related-articles",
        name: "related articles"
      }
    ]);

    return (
      <article
        ref={node => {
          this.node = node;
        }}
      >
        <Head article={article} />
        <AdComposer adConfig={adConfig}>
          <LazyLoad rootMargin={spacing(10)} threshold={0.5}>
            {({ observed, registerNode }) => (
              <Fragment>
                <HeaderAdContainer key="headerAd">
                  <Ad
                    contextUrl={url}
                    section={section}
                    slotName="header"
                    style={adStyle}
                  />
                </HeaderAdContainer>
                <MainContainer>
                  <ClientUserStateConsumer
                    twoPassRenderSlowly={({ user }) => {
                      const showFullArticle = shouldShowFullArticle(user);
                      const articleNeedsSaveAndShare =
                        savingEnabled || sharingEnabled;
                      const shouldRenderSaveAndShare =
                        articleNeedsSaveAndShare && showFullArticle;

                      return (
                        <Fragment>
                          <Header
                            topicsAllowed={showFullArticle}
                            width={articleWidth}
                          />
                          {shouldRenderSaveAndShare && (
                            <MessageContext.Consumer>
                              {({ showMessage }) => (
                                <StickySaveAndShareBar
                                  articleId={articleId}
                                  articleHeadline={headline}
                                  articleUrl={url}
                                  onCopyLink={() =>
                                    showMessage("Article link copied")
                                  }
                                  onSaveToMyArticles={() => {}}
                                  onShareOnEmail={() => {}}
                                  saveApi={saveApi}
                                  savingEnabled={
                                    savingEnabled && isLoggedIn(user)
                                  }
                                  sharingEnabled={sharingEnabled}
                                  shouldTokeniseShareLinks={isLoggedIn(user)}
                                />
                              )}
                            </MessageContext.Consumer>
                          )}
                        </Fragment>
                      );
                    }}
                  />
                  <BodyContainer>
                    <ArticleBody
                      content={newContent}
                      contextUrl={url}
                      observed={observed}
                      registerNode={registerNode}
                      section={section}
                      paidContentClassName={paidContentClassName}
                    />
                    <ClientUserStateConsumer
                      twoPassRenderSlowly={({ user }) => {
                        const notExpired = isNonExpiredUser(user);

                        return (
                          <ArticleExtras
                            analyticsStream={analyticsStream}
                            articleId={articleId}
                            commentsAllowed={notExpired}
                            commentsEnabled={commentsEnabled}
                            registerNode={registerNode}
                            relatedArticleAllowed={notExpired}
                            relatedArticleSlice={relatedArticleSlice}
                            relatedArticlesVisible={
                              !!observed.get("related-articles")
                            }
                            spotAccountId={spotAccountId}
                            topics={topics}
                            topicsAllowed={shouldShowFullArticle(user)}
                          />
                        );
                      }}
                    />
                  </BodyContainer>
                </MainContainer>
              </Fragment>
            )}
          </LazyLoad>
        </AdComposer>
      </article>
    );
  }
}

ArticleSkeleton.propTypes = {
  ...articleSkeletonPropTypes,
  paidContentClassName: PropTypes.string
};
ArticleSkeleton.defaultProps = articleSkeletonDefaultProps;

export default articleTrackingContext(withTrackScrollDepth(ArticleSkeleton));
