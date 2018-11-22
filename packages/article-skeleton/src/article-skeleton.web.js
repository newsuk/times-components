import React, { Component, Fragment } from "react";
import Ad, { AdComposer } from "@times-components/ad";
import LazyLoad from "@times-components/lazy-load";
import RelatedArticles from "@times-components/related-articles";
import { spacing } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
import ArticleBody from "./article-body/article-body";
import ArticleTopics from "./article-topics";
import { articlePropTypes, articleDefaultProps } from "./article-prop-types";
import articleTrackingContext from "./article-tracking-context";

import {
  BodyContainer,
  HeaderAdContainer,
  MainContainer
} from "./styles/responsive";

const adStyle = {
  marginBottom: 0
};

class Article extends Component {
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
      data: { content, section, url, topics, relatedArticleSlice },
      Header,
      receiveChildList
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
                      content={content}
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
                  </BodyContainer>
                  <Ad contextUrl={url} section={section} slotName="pixel" />
                  <Ad
                    contextUrl={url}
                    section={section}
                    slotName="pixelteads"
                  />
                  <Ad contextUrl={url} section={section} slotName="pixelskin" />
                </MainContainer>
              </Fragment>
            )}
          </LazyLoad>
        </AdComposer>
      </article>
    );
  }
}

Article.propTypes = articlePropTypes;
Article.defaultProps = articleDefaultProps;

export default articleTrackingContext(withTrackScrollDepth(Article));
