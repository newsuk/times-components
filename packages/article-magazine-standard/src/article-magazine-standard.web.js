import React, { Component, Fragment } from "react";
import ArticleSkeleton from "@times-components/article-skeleton";
import {
  getHeadline,
  getLeadAsset,
  getStandardTemplateCrop
} from "@times-components/utils";
import { CentredCaption } from "@times-components/caption";
import ArticleLeadAsset from "@times-components/article-lead-asset";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";
import styles from "./styles";
import { LeadAssetContainer } from "./styles/responsive.web";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader({ width }) {
    const { article } = this.props;
    const {
      byline,
      flags,
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
          byline={byline}
          flags={flags}
          headline={getHeadline(headline, shortHeadline)}
          label={label}
          publicationName={publicationName}
          publishedTime={publishedTime}
          standfirst={standfirst}
        />
        <LeadAssetContainer style={styles.leadAssetContainer}>
          <ArticleLeadAsset
            {...getLeadAsset(article)}
            getImageCrop={getStandardTemplateCrop}
            renderCaption={({ captionProps }) => (
              <CentredCaption {...captionProps} />
            )}
            width={width}
          />
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
