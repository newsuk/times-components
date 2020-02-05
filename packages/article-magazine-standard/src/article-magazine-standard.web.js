import React, { Component, Fragment } from "react";
import ArticleSkeleton from "@times-components/article-skeleton";
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

  renderHeader() {
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
      logoUrl,
      navigationMode,
      receiveChildList,
      spotAccountId,
      paidContentClassName,
      isPreview
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
        logoUrl={logoUrl}
        receiveChildList={receiveChildList}
        navigationMode={navigationMode}
        spotAccountId={spotAccountId}
        paidContentClassName={paidContentClassName}
        isPreview={isPreview}
      />
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
