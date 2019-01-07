import React, { Component, Fragment } from "react";
import ArticleSkeleton from "@times-components/article-skeleton";
import { getHeadline, getLeadAsset } from "@times-components/utils";
import { CentredCaption } from "@times-components/caption";
import Meta from "./article-meta/article-meta";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";
import styles from "./styles";
import { HeaderContainer, LeadAsset } from "./styles/responsive";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader({ width }) {
    const { article } = this.props;
    const {
      backgroundColour,
      byline,
      flags,
      hasVideo,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
      textColour
    } = article;

    return (
      <Fragment>
        <ArticleHeader
          backgroundColour={backgroundColour}
          flags={flags}
          hasVideo={hasVideo}
          headline={getHeadline(headline, shortHeadline)}
          label={label}
          standfirst={standfirst}
          textColour={textColour}
        />
        <LeadAsset
          {...getLeadAsset(article)}
          renderCaption={({ caption }) => <CentredCaption {...caption} />}
          style={styles.leadAsset}
          width={width}
        />
        <HeaderContainer style={styles.metaContainer}>
          <Meta
            backgroundColour={backgroundColour}
            byline={byline}
            publicationName={publicationName}
            publishedTime={publishedTime}
            textColour={textColour}
          />
        </HeaderContainer>
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
