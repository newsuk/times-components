import React, { Component, Fragment } from "react";
import Article from "@times-components/article";
import { getLeadAsset, getHeadline } from "@times-components/utils";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import ArticleTopics from "./article-topics";
import LeadAssetComponent from "./article-lead-asset/article-lead-asset";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";

import {
  HeaderContainer,
  LeadAssetContainer,
  MetaContainer
} from "./styles/responsive";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader(parentProps) {
    const {
      byline,
      hasVideo,
      headline,
      flags,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
      topics
    } = this.props.article;
    const leadAssetProps = getLeadAsset(this.props.article);

    return (
      <Fragment>
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
          <LeadAssetComponent {...leadAssetProps} width={parentProps.width} />
        </LeadAssetContainer>
      </Fragment>
    );
  }

  render() {
    const {
      adConfig,
      article,
      analyticsStream,
      error,
      isLoading,
      receiveChildList
    } = this.props;

    if (error || isLoading) {
      return null;
    }

    return (
      <Article
        adConfig={adConfig}
        analyticsStream={analyticsStream}
        data={article}
        Header={this.renderHeader}
        receiveChildList={receiveChildList}
      />
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
