import { Component } from "react";
import PropTypes from "prop-types";

class Inner extends Component {
  constructor(props) {
    super(props);
    this.numberOfDebouncedPropsUpdates = 0;
  }

  componentDidUpdate({ debouncedProps }) {
    const { debouncedProps: propsDebouncedProps } = this.props;

    if (debouncedProps !== propsDebouncedProps) {
      this.numberOfDebouncedPropsUpdates += 1;
    }
  }

  render() {
    return "hello";
  }
}
Inner.propTypes = {
  debouncedProps: PropTypes.shape({}).isRequired
};

export default Inner;
