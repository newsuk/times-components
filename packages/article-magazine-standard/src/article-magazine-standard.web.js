import React, { Component, Fragment } from "react";
import ArticleSkeleton, {
  ArticleKeylineContainer
} from "@times-components/article-skeleton";
import {
  getHeadline,
  getLeadAsset,
  getStandardTemplateCrop
} from "@times-components/utils";
import { CentredCaption } from "@times-components/caption";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";
import styles from "./styles";
import { LeadAsset } from "./styles/responsive.web";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader({ width, saveAndShareBar }) {
    const { article } = this.props;
    const {
      bylines,
      expirableFlags,
      hasVideo,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst
    } = article;

    return (
      <Fragment>
        <ArticleHeader
          bylines={bylines}
          flags={expirableFlags}
          hasVideo={hasVideo}
          headline={getHeadline(headline, shortHeadline)}
          label={label}
          publicationName={publicationName}
          publishedTime={publishedTime}
          standfirst={standfirst}
        />
        <LeadAsset
          {...getLeadAsset(article)}
          getImageCrop={getStandardTemplateCrop}
          renderCaption={({ caption }) => <CentredCaption {...caption} />}
          style={styles.leadAssetContainer}
          width={width}
        />
        <ArticleKeylineContainer>{saveAndShareBar}</ArticleKeylineContainer>
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
      saveApi,
      spotAccountId,
      paidContentClassName,
      faviconUrl
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
        saveApi={saveApi}
        spotAccountId={spotAccountId}
        paidContentClassName={paidContentClassName}
        faviconUrl={faviconUrl}
      />
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
