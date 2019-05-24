import React, { Component, Fragment } from "react";
import Ad, { AdComposer } from "@times-components/ad";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import ArticleExtras from "@times-components/article-extras";
import LazyLoad from "@times-components/lazy-load";
import { spacing, breakpoints } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
import Context from "@times-components/context";
import saveArticleApi from "@times-components/save-star-web/mock-save-api-showcase";
import { isLoggedIn, isMeteredExpired } from "@times-components/utils";
import ArticleBody from "./article-body/article-body";
import {
  articleSkeletonPropTypes,
  articleSkeletonDefaultProps
} from "./article-skeleton-prop-types";
import articleTrackingContext from "./article-tracking-context";
import insertDropcapIntoAST from "./dropcap-util";
import {
  BodyContainer,
  HeaderAdContainer,
  MainContainer,
  SaveShareContainer,
  SaveShareRefContainer,
  isStickyAllowed
} from "./styles/responsive";
import Head from "./head";

const adStyle = {
  marginBottom: 0
};

class ArticleSkeleton extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      articleWidth: null,
      isSticky: false
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      articleWidth: this.node && this.node.clientWidth
    });

    if (window && window.nuk.user.isLoggedIn) {
      window.addEventListener("scroll", this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (window && window.nuk.user.isLoggedIn) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  handleScroll() {
    if (this.sticky) {
      const offsetTop = this.sticky.getBoundingClientRect().top;
      const isSticky = isStickyAllowed(breakpoints.huge) && offsetTop <= 1;

      this.setState({ isSticky });
    }
  }

  renderSaveAndShareBar({
    articleId,
    headline,
    url,
    isSticky,
    allowSaveAndShare,
    saveApi,
    savingEnabled,
    sharingEnabled
  }) {
    const saveServiceApi = saveApi || saveArticleApi;
    if (!allowSaveAndShare) return null;

    return (
      <SaveShareContainer isSticky={isSticky}>
        <SaveShareRefContainer isSticky={isSticky}>
          <div
            ref={el => {
              this.sticky = el;
            }}
          >
            <SaveAndShareBar
              articleId={articleId}
              articleHeadline={headline}
              articleUrl={url}
              onCopyLink={() => {}}
              onSaveToMyArticles={() => {}}
              onShareOnEmail={() => {}}
              saveApi={saveServiceApi}
              savingEnabled={savingEnabled}
              sharingEnabled={sharingEnabled}
            />
          </div>
        </SaveShareRefContainer>
      </SaveShareContainer>
    );
  }

  render() {
    const {
      adConfig,
      analyticsStream,
      data: article,
      Header,
      receiveChildList,
      saveApi,
      spotAccountId
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

    const { articleWidth, isSticky } = this.state;
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
                          {(savingEnabled || sharingEnabled) &&
                            this.renderSaveAndShareBar({
                              articleId,
                              headline,
                              url,
                              isSticky,
                              allowSaveAndShare: isUserLoggedIn,
                              saveApi,
                              savingEnabled,
                              sharingEnabled
                            })}
                          <BodyContainer>
                            <ArticleBody
                              content={newContent}
                              contextUrl={url}
                              observed={observed}
                              registerNode={registerNode}
                              section={section}
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

ArticleSkeleton.propTypes = articleSkeletonPropTypes;
ArticleSkeleton.defaultProps = articleSkeletonDefaultProps;

export default articleTrackingContext(withTrackScrollDepth(ArticleSkeleton));
