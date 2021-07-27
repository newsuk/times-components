import React, { Component, Fragment } from "react";
import ArticleSkeleton from "@times-components/article-skeleton";
import { getHeadline, getLeadAsset } from "@times-components/utils";
import Caption from "@times-components/caption";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import ArticleTopics from "./article-topics";
import {
  articleDefaultProps,
  articlePropTypes
} from "./article-prop-types/article-prop-types";
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

  renderHeader() {
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

    const metaProps = { bylines, publicationName, publishedTime };

    return (
      <Fragment>
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
        <LeadAsset {...getLeadAsset(article)} renderCaption={renderCaption} />
        <ArticleMeta {...metaProps} inline className="inline-meta" />
      </Fragment>
    );
  }

  render() {
    const {
      article,
      analyticsStream,
      error,
      isLoading,
      logoUrl,
      navigationMode,
      receiveChildList,
      spotAccountId,
      paidContentClassName,
      isPreview,
      additionalRelatedArticlesFlag,
      algoliaSearchKeys,
      latestFromSectionFlag,
      latestFromSection,
      olympicsKeys
    } = this.props;

    if (error || isLoading) {
      return null;
    }
    return (
      <ArticleMainStandardContainer>
        <ArticleSkeleton
          analyticsStream={analyticsStream}
          data={article}
          Header={this.renderHeader}
          logoUrl={logoUrl}
          receiveChildList={receiveChildList}
          navigationMode={navigationMode}
          spotAccountId={spotAccountId}
          paidContentClassName={paidContentClassName}
          isPreview={isPreview}
          additionalRelatedArticlesFlag={additionalRelatedArticlesFlag}
          algoliaSearchKeys={algoliaSearchKeys}
          latestFromSectionFlag={latestFromSectionFlag}
          latestFromSection={latestFromSection}
          olympicsKeys={olympicsKeys}
        />
      </ArticleMainStandardContainer>
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
