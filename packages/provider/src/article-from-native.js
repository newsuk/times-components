import { Component } from "react";
import PropTypes from "prop-types";

class NativeArticleProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.fetchArticle = this.fetchArticle.bind(this);
  }

  componentDidMount() {
    if (!this.fetched) {
      this.fetched = true;
      this.fetchArticle();
    }
  }

  fetchArticle() {
    const { articleId, fetch } = this.props;

    this.setState({ isLoading: true }, () => {
      fetch(articleId)
        .then(data => {
          this.setState({ isLoading: false, data });
        })
        .catch(error => {
          this.setState({ isLoading: false, error });
        });
    });
  }

  render() {
    const { children } = this.props;
    const { error, isLoading, data } = this.state;
    return children({ error, isLoading, data, refetch: this.fetchArticle });
  }
}

NativeArticleProvider.propTypes = {
  articleId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired
};

export default NativeArticleProvider;
