import React, { Component } from "react";
import Ad, { AdComposer } from "@times-components/ad";
import RelatedArticles from "@times-components/related-articles";
import LazyLoad from "@times-components/lazy-load";
import { spacing } from "@times-components/styleguide";
import ArticleBody from "./article-body/article-body";
import ArticleHeader from "./article-header/article-header";
import ArticleLoading from "./article-loading";
import ArticleMeta from "./article-meta/article-meta";
import ArticleTopics from "./article-topics";
import LeadAssetComponent from "./article-lead-asset/article-lead-asset";
import getLeadAsset from "./article-lead-asset/get-lead-asset";
import articleTrackingContext from "./article-tracking-context";
import { articlePropTypes, articleDefaultProps } from "./article-prop-types";
import {
  articlePagePropTypes,
  articlePageDefaultProps
} from "./article-page-prop-types";

import {
  MainContainer,
  HeaderContainer,
  MetaContainer,
  LeadAssetContainer,
  BodyContainer,
  HeaderAdContainer
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
      analyticsStream,
      data: {
        hasVideo,
        headline,
        flags,
        standfirst,
        label,
        byline,
        publishedTime,
        publicationName,
        content,
        section,
        url,
        topics,
        relatedArticleSlice
      },
      observed,
      onAuthorPress,
      onTopicPress,
      registerNode
    } = this.props;

    const leadAssetProps = getLeadAsset(this.props.data);
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

    return (
      <article
        ref={node => {
          this.node = node;
        }}
      >
        <HeaderAdContainer key="headerAd">
          <Ad
            contextUrl={url}
            section={section}
            slotName="header"
            style={adStyle}
          />
        </HeaderAdContainer>
        <MainContainer>
          <header>
            <HeaderContainer>
              <ArticleHeader
                flags={flags}
                hasVideo={hasVideo}
                headline={headline}
                label={label}
                standfirst={standfirst}
              />
            </HeaderContainer>
            <MetaContainer>
              <ArticleMeta
                byline={byline}
                onAuthorPress={onAuthorPress}
                publicationName={publicationName}
                publishedTime={publishedTime}
              />
              <ArticleTopics
                device="DESKTOP"
                onPress={onTopicPress}
                topics={topics}
              />
            </MetaContainer>
            <LeadAssetContainer>
              <LeadAssetComponent
                {...leadAssetProps}
                width={this.state.articleWidth}
              />
            </LeadAssetContainer>
          </header>
          <BodyContainer>
            <ArticleBody
              content={content}
              contextUrl={url}
              observed={observed}
              registerNode={registerNode}
              section={section}
            />
          </BodyContainer>
        </MainContainer>
        <ArticleTopics onPress={onTopicPress} topics={topics} />
        <aside id="related-articles" ref={node => registerNode(node)}>
          {displayRelatedArticles({
            isVisible: !!observed.get("related-articles")
          })}
        </aside>
        <Ad contextUrl={url} section={section} slotName="pixel" />
        <Ad contextUrl={url} section={section} slotName="pixelteads" />
        <Ad contextUrl={url} section={section} slotName="pixelskin" />
      </article>
    );
  }
}

Article.propTypes = articlePropTypes;
Article.defaultProps = articleDefaultProps;

const ArticlePage = ({
  adConfig,
  analyticsStream,
  article,
  error,
  isLoading,
  onAuthorPress,
  onRelatedArticlePress,
  onTopicPress
}) => {
  if (error) {
    return null;
  }

  if (isLoading) {
    return <ArticleLoading />;
  }

  return (
    <AdComposer adConfig={adConfig}>
      <LazyLoad rootMargin={spacing(10)} threshold={0.5}>
        {({ observed, registerNode }) => (
          <Article
            analyticsStream={analyticsStream}
            data={article}
            observed={observed}
            onAuthorPress={onAuthorPress}
            onRelatedArticlePress={onRelatedArticlePress}
            onTopicPress={onTopicPress}
            registerNode={registerNode}
          />
        )}
      </LazyLoad>
    </AdComposer>
  );
};

ArticlePage.propTypes = articlePagePropTypes;
ArticlePage.defaultProps = articlePageDefaultProps;

export default articleTrackingContext(ArticlePage);
