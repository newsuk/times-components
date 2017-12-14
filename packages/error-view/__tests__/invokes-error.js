import { Component } from "react";
import PropTypes from "prop-types";

class Erroring extends Component {
  componentDidMount() {
    this.props.onError(new Error("some error"));
  }

  render() {
    return null;
  }
}

Erroring.propTypes = {
  onError: PropTypes.func
};

Erroring.defaultProps = {
  onError: () => {}
};

export default Erroring;
