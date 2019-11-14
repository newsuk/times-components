import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Ad, { AdComposer } from "@times-components/ad";
import ArticleExtras from "@times-components/article-extras";
import LazyLoad from "@times-components/lazy-load";
import { spacing } from "@times-components/styleguide";
import { StickyProvider } from "@times-components/sticky";
import { withTrackScrollDepth } from "@times-components/tracking";
import UserState from "@times-components/user-state";
import { MessageContext } from "@times-components/message-bar";
import ArticleBody, { ArticleLink } from "./article-body/article-body";
import {
  articleSkeletonDefaultProps,
  articleSkeletonPropTypes
} from "./article-skeleton-prop-types";
import articleTrackingContext from "./tracking/article-tracking-context";
import insertDropcapIntoAST from "./dropcap-util";
import {
  BodyContainer,
  HeaderAdContainer,
  HeaderContainer,
  MainContainer
} from "./styles/responsive";
import Head from "./head";
import StickySaveAndShareBar from "./sticky-save-and-share-bar";

const adStyle = {
  marginBottom: 0
};

const maybeInsertDropcap = (content, template, dropcapsDisabled) => {
  if (content && content.length > 0) {
    return insertDropcapIntoAST(content, template, dropcapsDisabled);
  }
  return content;
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
      logoUrl,
      receiveChildList,
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
    const newContent = maybeInsertDropcap(
      [...content],
      template,
      dropcapsDisabled
    );

    receiveChildList([
      {
        elementId: "related-articles",
        name: "related articles"
      }
    ]);

    return (
      <StickyProvider>
        <article
          data-article-identifier={article.id}
          ref={node => {
            this.node = node;
          }}
        >
          <Head
            article={article}
            logoUrl={logoUrl}
            paidContentClassName={paidContentClassName}
          />
          <AdComposer adConfig={adConfig}>
            <Fragment>
              <Fragment>
                <HeaderAdContainer key="headerAd">
                  <Ad
                    contextUrl={url}
                    section={section}
                    slotName="header"
                    style={adStyle}
                  />
                </HeaderAdContainer>
                <MainContainer accessibilityRole="main">
                  <HeaderContainer>
                    <Header width={articleWidth} />
                    {savingEnabled || sharingEnabled ? (
                      <UserState state={UserState.loggedInOrShared}>
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
                              savingEnabled={savingEnabled}
                              sharingEnabled={sharingEnabled}
                            />
                          )}
                        </MessageContext.Consumer>
                      </UserState>
                    ) : null}
                  </HeaderContainer>
                  <BodyContainer accessibilityRole="article">
                    <ArticleBody
                      content={newContent}
                      contextUrl={url}
                      section={section}
                      paidContentClassName={paidContentClassName}
                    />
                    <LazyLoad rootMargin={spacing(10)} threshold={0.5}>
                      {({ observed, registerNode }) => (
                        <ArticleExtras
                          analyticsStream={analyticsStream}
                          articleId={articleId}
                          articleHeadline={headline}
                          articleUrl={url}
                          savingEnabled={savingEnabled}
                          sharingEnabled={sharingEnabled}
                          commentsEnabled={commentsEnabled}
                          registerNode={registerNode}
                          relatedArticleSlice={relatedArticleSlice}
                          relatedArticlesVisible={
                            !!observed.get("related-articles")
                          }
                          spotAccountId={spotAccountId}
                          topics={topics}
                        />
                      )}
                    </LazyLoad>
                  </BodyContainer>
                </MainContainer>
              </Fragment>
              <Ad contextUrl={url} section={section} slotName="pixel" />
              <Ad contextUrl={url} section={section} slotName="pixelteads" />
              <Ad contextUrl={url} section={section} slotName="pixelskin" />
            </Fragment>
          </AdComposer>
        </article>
      </StickyProvider>
    );
  }
}

ArticleSkeleton.propTypes = {
  ...articleSkeletonPropTypes,
  paidContentClassName: PropTypes.string
};
ArticleSkeleton.defaultProps = articleSkeletonDefaultProps;

export { KeylineItem, ArticleKeylineItem } from "./keylines";

export { ArticleLink };

export default articleTrackingContext(withTrackScrollDepth(ArticleSkeleton));
