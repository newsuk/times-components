import React, { Component, Fragment } from "react";
import Ad, { AdComposer } from "@times-components/ad";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import ArticleExtras from "@times-components/article-extras";
import LazyLoad from "@times-components/lazy-load";
import { spacing, breakpoints } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
import Context from "@times-components/context";
import { saveApi as saveArticleApi } from "@times-components/save-star-web";
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
  SaveShareInnerContainer,
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
    this.stickyRef = React.createRef();

    this.state = {
      articleWidth: null
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      articleWidth: this.node && this.node.clientWidth
    });

    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // Not using state for performance
  handleScroll() {
    const sticky = this.stickyRef.current;

    if (sticky) {
      const offsetTop = sticky.getBoundingClientRect().top;
      const isSticky = isStickyAllowed(breakpoints.huge) && offsetTop <= 1;

      if (isSticky !== this.isSticky) {
        this.isSticky = isSticky;

        if (isSticky) {
          sticky.classList.add("isSticky");
        } else {
          sticky.classList.remove("isSticky");
        }
      }
    }
  }

  renderSaveAndShareBar({
    articleId,
    headline,
    url,
    allowSaveAndShare,
    saveApi,
    savingEnabled,
    sharingEnabled
  }) {
    const saveServiceApi =
      saveApi && saveApi.bookmark ? saveApi : saveArticleApi;

    if (!allowSaveAndShare) return null;

    return (
      <SaveShareContainer ref={this.stickyRef}>
        <SaveShareInnerContainer>
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
        </SaveShareInnerContainer>
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
