import React, { Component } from "react";
import PropTypes from "prop-types";

import AdManager from "./ad-manager";

class GPT extends Component {
  componentDidMount() {
    this.props.adManager.registerAd(this.props.code);
  }

  componentWillUnmount() {
    this.props.adManager.unregisterAd(this.props.code);
  }

  render() {
    return <div id={this.props.code} />;
  }
}

GPT.propTypes = {
  code: PropTypes.string.isRequired,
  adManager: PropTypes.instanceOf(AdManager).isRequired
};

export default GPT;
