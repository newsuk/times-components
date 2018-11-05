import React, { Component } from "react";
import Ad, { AdComposer } from "@times-components/ad";
import Article from "@times-components/article";
import { withTrackScrollDepth } from "@times-components/tracking";
import { getLeadAsset, getHeadline } from "@times-components/utils";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import ArticleTopics from "./article-topics";
import LeadAssetComponent from "./article-lead-asset/article-lead-asset";
import articleTrackingContext from "./article-tracking-context";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";
import {
  articlePagePropTypes,
  articlePageDefaultProps
} from "./article-prop-types/article-page-prop-types";

import {
  MainContainer,
  HeaderContainer,
  MetaContainer,
  LeadAssetContainer,
  HeaderAdContainer,
  BodyContainer
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
      adConfig,
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
        shortHeadline,
        standfirst,
        topics,
        url
      },
      receiveChildList
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
          <HeaderContainer>
            <ArticleHeader
              flags={flags}
              hasVideo={hasVideo}
              headline={getHeadline(headline, shortHeadline)}
              label={label}
              standfirst={standfirst}
            />
          </HeaderContainer>
          <MetaContainer>
            <ArticleMeta
              byline={byline}
              publicationName={publicationName}
              publishedTime={publishedTime}
            />
            <ArticleTopics topics={topics} />
          </MetaContainer>
          <LeadAssetContainer>
            <LeadAssetComponent
              {...leadAssetProps}
              width={this.state.articleWidth}
            />
          </LeadAssetContainer>
          <BodyContainer>
            <Article
              adConfig={adConfig}
              analyticsStream={analyticsStream}
              data={this.props.data}
              receiveChildList={receiveChildList}
            />
          </BodyContainer>
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
  isLoading,
  error,
  receiveChildList
}) => {
  if (error || isLoading) {
    return null;
  }

  return (
    <AdComposer adConfig={adConfig}>
      <ArticlePage
        adConfig={adConfig}
        analyticsStream={analyticsStream}
        data={article}
        receiveChildList={receiveChildList}
      />
    </AdComposer>
  );
};

ArticleMainStandard.propTypes = articlePagePropTypes;
ArticleMainStandard.defaultProps = articlePageDefaultProps;

export default articleTrackingContext(
  withTrackScrollDepth(ArticleMainStandard)
);
