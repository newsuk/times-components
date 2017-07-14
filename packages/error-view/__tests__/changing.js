import { Component } from "react";
import PropTypes from "prop-types";

class Changing extends Component {
  componentDidMount() {
    this.props.onChange({ state: "boiled" });
  }

  render() {
    return null;
  }
}

Changing.propTypes = {
  onChange: PropTypes.func
};

Changing.defaultProps = {
  onChange: () => {}
};

export default Changing;
