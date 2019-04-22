import React, { Component, Fragment } from "react";
import Ad, { AdComposer } from "@times-components/ad";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import ArticleExtras from "@times-components/article-extras";
import LazyLoad from "@times-components/lazy-load";
import { spacing } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
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
  RefContainer
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
    this.setState(state => ({
      ...state,
      articleWidth: this.node && this.node.clientWidth
    }));
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const offsetTop = this.sticky.getBoundingClientRect().top;

    return offsetTop === 1 || offsetTop === 0
      ? this.setState(state => ({ ...state, isSticky: true }))
      : this.setState(state => ({ ...state, isSticky: false }));
  }

  render() {
    const {
      adConfig,
      analyticsStream,
      data: article,
      Header,
      receiveChildList,
      spotAccountId
    } = this.props;

    const {
      commentsEnabled,
      content,
      dropcapsDisabled,
      id: articleId,
      section,
      url,
      topics,
      relatedArticleSlice,
      template
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
                  <Header width={articleWidth} />
                  <SaveShareContainer isSticky={isSticky}>
                    <RefContainer isSticky={isSticky}>
                      <div
                        ref={el => {
                          this.sticky = el;
                        }}
                      >
                        <SaveAndShareBar />
                      </div>
                    </RefContainer>
                  </SaveShareContainer>
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
                      commentsEnabled={commentsEnabled}
                      registerNode={registerNode}
                      relatedArticleSlice={relatedArticleSlice}
                      relatedArticlesVisible={
                        !!observed.get("related-articles")
                      }
                      spotAccountId={spotAccountId}
                      topics={topics}
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

ArticleSkeleton.propTypes = articleSkeletonPropTypes;
ArticleSkeleton.defaultProps = articleSkeletonDefaultProps;

export default articleTrackingContext(withTrackScrollDepth(ArticleSkeleton));
