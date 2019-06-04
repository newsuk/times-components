import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Ad, { AdComposer } from "@times-components/ad";
import ArticleExtras from "@times-components/article-extras";
import LazyLoad from "@times-components/lazy-load";
import { spacing } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
import Context from "@times-components/context";
import { isLoggedIn, isMeteredExpired } from "@times-components/utils";
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
        <Context.Consumer>
          {({ user }) => {
            const isUserLoggedIn = isLoggedIn(user);
            const isAllowed = isUserLoggedIn && !isMeteredExpired(user);
            const shouldRenderSaveAndShare =
              (savingEnabled || sharingEnabled) && isUserLoggedIn;

            return (
              <Fragment>
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
                          <Header
                            topicsAllowed={isUserLoggedIn}
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
                                  savingEnabled={savingEnabled}
                                  sharingEnabled={sharingEnabled}
                                />
                              )}
                            </MessageContext.Consumer>
                          )}
                          <BodyContainer>
                            <ArticleBody
                              content={newContent}
                              contextUrl={url}
                              observed={observed}
                              registerNode={registerNode}
                              section={section}
                              paidContentClassName={paidContentClassName}
                            />
                            <ArticleExtras
                              analyticsStream={analyticsStream}
                              articleId={articleId}
                              commentsAllowed={isAllowed}
                              commentsEnabled={commentsEnabled}
                              registerNode={registerNode}
                              relatedArticleAllowed={isAllowed}
                              relatedArticleSlice={relatedArticleSlice}
                              relatedArticlesVisible={
                                !!observed.get("related-articles")
                              }
                              spotAccountId={spotAccountId}
                              topics={topics}
                              topicsAllowed={isAllowed}
                            />
                          </BodyContainer>
                        </MainContainer>
                      </Fragment>
                    )}
                  </LazyLoad>
                </AdComposer>
              </Fragment>
            );
          }}
        </Context.Consumer>
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
