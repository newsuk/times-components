import React, { Component, Fragment } from "react";
import ArticleSkeleton, {
  ArticleKeylineItem
} from "@times-components/article-skeleton";
import { getHeadline, getLeadAsset } from "@times-components/utils";
import { CentredCaption } from "@times-components/caption";
import Meta from "./article-meta/article-meta";
import ArticleHeader from "./article-header/article-header";
import {
  articleDefaultProps,
  articlePropTypes
} from "./article-prop-types/article-prop-types";
import styles from "./styles";
import { LeadAsset } from "./styles/responsive";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    const { article, removeTeaserContent } = this.props;
    const {
      backgroundColour,
      bylines,
      expirableFlags,
      hasVideo,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
      textColour,
      updatedTime
    } = article;

    return (
      <Fragment>
        <ArticleHeader
          backgroundColour={backgroundColour}
          flags={expirableFlags}
          hasVideo={hasVideo}
          headline={getHeadline(headline, shortHeadline)}
          label={label}
          standfirst={standfirst}
          textColour={textColour}
          updatedTime={updatedTime}
        />
        {!removeTeaserContent && (
          <LeadAsset
            {...getLeadAsset(article)}
            renderCaption={({ caption }) => <CentredCaption {...caption} />}
            style={styles.leadAsset}
          />
        )}
        {!removeTeaserContent && (
          <ArticleKeylineItem>
            <Meta
              backgroundColour={backgroundColour}
              bylines={bylines}
              publicationName={publicationName}
              publishedTime={publishedTime}
              textColour={textColour}
            />
          </ArticleKeylineItem>
        )}
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
      commentingConfig,
      articleDataFromRender,
      paidContentClassName,
      isPreview,
      swgProductId,
      isNewCommentingBannerEnabled,
      removeTeaserContent
    } = this.props;

    if (error || isLoading) {
      return null;
    }

    return (
      <ArticleSkeleton
        analyticsStream={analyticsStream}
        data={article}
        Header={this.renderHeader}
        logoUrl={logoUrl}
        receiveChildList={receiveChildList}
        navigationMode={navigationMode}
        commentingConfig={commentingConfig}
        articleDataFromRender={articleDataFromRender}
        paidContentClassName={paidContentClassName}
        isPreview={isPreview}
        swgProductId={swgProductId}
        isNewCommentingBannerEnabled={isNewCommentingBannerEnabled}
        removeTeaserContent={removeTeaserContent}
      />
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
