import React, { Component } from "react";
import ErrorView from "@times-components/error-view";
import ArticleListItem from "./article-list-item";
import { propTypes, defaultProps } from "./article-list-item-prop-types";

class ArticleListItemWithError extends Component {
  constructor(props) {
    super(props);
    this.renderWithErrorBoundary = this.renderWithErrorBoundary.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { article } = this.props;
    const { article: nextArticle } = nextProps;
    return (
      !article || !nextArticle || nextArticle.elementId !== article.elementId
    );
  }

  renderWithErrorBoundary({ hasError }) {
    return hasError ? null : <ArticleListItem {...this.props} />;
  }

  render() {
    return <ErrorView>{this.renderWithErrorBoundary}</ErrorView>;
  }
}

ArticleListItemWithError.propTypes = propTypes;
ArticleListItemWithError.defaultProps = defaultProps;

export default ArticleListItemWithError;
