import React, { Component, Fragment } from "react";
import Ad, { AdComposer } from "@times-components/ad";
import ArticleComments from "@times-components/article-comments";
import LazyLoad from "@times-components/lazy-load";
import RelatedArticles from "@times-components/related-articles";
import { spacing } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
import ArticleBody from "./article-body/article-body";
import ArticleTopics from "./article-topics";
import {
  articleSkeletonPropTypes,
  articleSkeletonDefaultProps
} from "./article-skeleton-prop-types";
import articleTrackingContext from "./article-tracking-context";
import insertDropcapIntoAST from "./dropcap-util";
import {
  BodyContainer,
  HeaderAdContainer,
  MainContainer
} from "./styles/responsive";

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
      data: {
        commentsEnabled,
        content,
        id: articleId,
        section,
        url,
        topics,
        relatedArticleSlice,
        template
      },
      Header,
      receiveChildList,
      spotAccountId
    } = this.props;
    const { articleWidth } = this.state;
    // eslint-disable-next-line react/prop-types
    const displayRelatedArticles = ({ isVisible }) =>
      relatedArticleSlice ? (
        <RelatedArticles
          analyticsStream={analyticsStream}
          isVisible={isVisible}
          slice={{
            ...relatedArticleSlice,
            sliceName: relatedArticleSlice.__typename // eslint-disable-line no-underscore-dangle
          }}
        />
      ) : null;
    const newContent = [...content];
    if (newContent && newContent.length > 0) {
      newContent[0] = insertDropcapIntoAST(newContent[0], template);
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
                  <BodyContainer>
                    <ArticleBody
                      content={newContent}
                      contextUrl={url}
                      observed={observed}
                      registerNode={registerNode}
                      section={section}
                    />

                    <ArticleTopics topics={topics} />
                    <aside
                      id="related-articles"
                      ref={node => registerNode(node)}
                    >
                      {displayRelatedArticles({
                        isVisible: !!observed.get("related-articles")
                      })}
                    </aside>
                    {commentsEnabled && (
                      <ArticleComments
                        articleId={articleId}
                        spotAccountId={spotAccountId}
                      />
                    )}
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
