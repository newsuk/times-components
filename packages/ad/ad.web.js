import React, { Component } from "react";
import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";
import { Subscriber } from "react-broadcast";
import AdComposer from "./ad-composer";
import GPT from "./gpt";

const { style: ViewPropTypesStyle } = ViewPropTypes;

class Ad extends Component {
  renderGpt(adManager) {
    return (
      <GPT
        adManager={adManager}
        code={this.props.code}
        style={this.props.style}
      />
    );
  }

  render() {
    return (
      <Subscriber channel="adChannel">
        {adManager => this.renderGpt(adManager)}
      </Subscriber>
    );
  }
}

Ad.propTypes = {
  code: PropTypes.string.isRequired,
  style: ViewPropTypesStyle
};

Ad.defaultProps = {
  style: null
};

export default Ad;

export { AdComposer };
