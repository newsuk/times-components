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
    return this.props.children({
      hasError: !!this.state.error,
      error: this.state.error,
      onError: this.handleError
    });
  }
}

ErrorView.propTypes = {
  children: PropTypes.func.isRequired
};

export default ErrorView;
