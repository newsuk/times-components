import React, { Component, Fragment } from "react";
import Article from "@times-components/article";
import { getLeadAsset, getHeadline } from "@times-components/utils";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader(parentProps) {
    const {
      byline,
      headline,
      flags,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
    } = this.props.article;

    return (
        <ArticleHeader
          byline={byline}
          headline={getHeadline(headline, shortHeadline)}
          flags={flags}
          label={label}
          publicationName={publicationName}
          publishedTime={publishedTime}
          standfirst={standfirst}
        />
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
