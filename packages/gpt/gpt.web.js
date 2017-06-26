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
    const props = this.props;
    return <div id={props.code} />;
  }
}

GPT.propTypes = {
  code: PropTypes.string.isRequired,
  adManager: PropTypes.instanceOf(AdManager).isRequired
};

export default GPT;
