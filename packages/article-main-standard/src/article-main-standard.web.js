import React, { Component, Fragment } from "react";
import ArticleSkeleton from "@times-components/article-skeleton";
import { getLeadAsset, getHeadline } from "@times-components/utils";
import Caption from "@times-components/caption";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import ArticleTopics from "./article-topics";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";
import { LeadAssetCaptionContainer } from "./styles/article-body/responsive";

import { HeaderContainer, LeadAsset, MetaContainer } from "./styles/responsive";

const renderCaption = ({ caption }) => (
  <LeadAssetCaptionContainer>
    <Caption {...caption} />
  </LeadAssetCaptionContainer>
);

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader(parentProps) {
    const { article } = this.props;
    const {
      bylines,
      hasVideo,
      headline,
      expirableFlags,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
      topics
    } = article;
    return (
      <Fragment>
        <HeaderContainer>
          <ArticleHeader
            flags={expirableFlags}
            hasVideo={hasVideo}
            headline={getHeadline(headline, shortHeadline)}
            label={label}
            standfirst={standfirst}
          />
        </HeaderContainer>
        <MetaContainer>
          <ArticleMeta
            bylines={bylines}
            publicationName={publicationName}
            publishedTime={publishedTime}
          />
          {parentProps.topicsAllowed ? <ArticleTopics topics={topics} /> : null}
        </MetaContainer>
        <LeadAsset
          {...getLeadAsset(article)}
          renderCaption={renderCaption}
          width={parentProps.width}
        />
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
      receiveChildList,
      spotAccountId
    } = this.props;

    if (error || isLoading) {
      return null;
    }

    return (
      <ArticleSkeleton
        adConfig={adConfig}
        analyticsStream={analyticsStream}
        data={article}
        Header={this.renderHeader}
        receiveChildList={receiveChildList}
        spotAccountId={spotAccountId}
      />
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
