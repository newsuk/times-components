import React, { Component } from "react";
import ArticleSkeleton from "@times-components/article-skeleton";
import { getHeadline, getLeadAsset } from "@times-components/utils";
import Caption from "@times-components/caption";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import ArticleTopics from "./article-topics";
import { articleDefaultProps, articlePropTypes } from "./article-prop-types/article-prop-types";
import { LeadAssetCaptionContainer } from "./styles/article-body/responsive";

import {
  ArticleMainStandardContainer,
  HeaderContainer,
  HeaderTopContainer,
  LeadAsset,
  MetaContainer
} from "./styles/responsive.web";

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

  renderHeader({ width }) {
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

    const leadAsset = (
      <LeadAsset
        {...getLeadAsset(article)}
        renderCaption={renderCaption}
        width={width}
      />
    );
    const metaProps = { bylines, publicationName, publishedTime };

    return (
      <>
        <HeaderTopContainer>
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
            <ArticleMeta {...metaProps} />
            <ArticleTopics topics={topics} />
          </MetaContainer>
        </HeaderTopContainer>
        {leadAsset}
        <ArticleMeta {...metaProps} inline className="inline-meta" />
      </>
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
      saveApi,
      spotAccountId,
      paidContentClassName,
      faviconUrl
    } = this.props;

    if (error || isLoading) {
      return null;
    }

    return (
      <ArticleMainStandardContainer>
        <ArticleSkeleton
          adConfig={adConfig}
          analyticsStream={analyticsStream}
          data={article}
          Header={this.renderHeader}
          receiveChildList={receiveChildList}
          saveApi={saveApi}
          spotAccountId={spotAccountId}
          paidContentClassName={paidContentClassName}
          faviconUrl={faviconUrl}
        />
      </ArticleMainStandardContainer>
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
