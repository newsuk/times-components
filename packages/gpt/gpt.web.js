// TODO: this component should be moved to component library

import React, { Component } from "react";
import PropTypes from "prop-types";

import AdManager from "./ad-manager";

class GPT extends Component {
  componentDidMount() {
    console.log("Component did mount", this.props);
    this.props.adManager.registerAd(this.props.code);
  }

  componentWillUnmount() {
    console.log("Component unmount");
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
