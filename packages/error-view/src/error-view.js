import { Component } from "react";
import PropTypes from "prop-types";

class ErrorView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };

    this.handleError = this.handleError.bind(this);
  }

  componentDidCatch(e) {
    this.setState({
      error: e
    });
  }

  handleError(e) {
    this.setState({
      error: e
    });
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    return children({
      error,
      hasError: !!error,
      onError: this.handleError
    });
  }
}

ErrorView.propTypes = {
  children: PropTypes.func.isRequired
};

export default ErrorView;
