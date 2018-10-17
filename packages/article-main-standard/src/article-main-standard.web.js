import React, { Component } from "react";
import Ad, { AdComposer } from "@times-components/ad";
import Article from "@times-components/article";
import LazyLoad from "@times-components/lazy-load";
import { spacing } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
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
  HeaderAdContainer
} from "./styles/responsive";

const adStyle = {
  marginBottom: 0
};

class ArticlePage extends Component {
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
        byline,
        hasVideo,
        headline,
        flags,
        label,
        publicationName,
        publishedTime,
        section,
        standfirst,
        topics,
        url
      },
      observed,
      onAuthorPress,
      onTopicPress,
      registerNode
    } = this.props;
    const leadAssetProps = getLeadAsset(this.props.data);

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
          <Article
            analyticsStream={analyticsStream}
            data={this.props.data}
            observed={observed}
            onTopicPress={onTopicPress}
            registerNode={registerNode}
          />
          <Ad contextUrl={url} section={section} slotName="pixel" />
          <Ad contextUrl={url} section={section} slotName="pixelteads" />
          <Ad contextUrl={url} section={section} slotName="pixelskin" />
        </MainContainer>
      </article>
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

const ArticleMainStandard = ({
  adConfig,
  analyticsStream,
  article,
  error,
  isLoading,
  onAuthorPress,
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
          <ArticlePage
            analyticsStream={analyticsStream}
            data={article}
            observed={observed}
            onAuthorPress={onAuthorPress}
            onTopicPress={onTopicPress}
            registerNode={registerNode}
          />
        )}
      </LazyLoad>
    </AdComposer>
  );
};

ArticleMainStandard.propTypes = articlePagePropTypes;
ArticleMainStandard.defaultProps = articlePageDefaultProps;

export default articleTrackingContext(withTrackScrollDepth(ArticleMainStandard));

