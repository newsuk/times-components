import React, { Component } from "react";
import PropTypes from "prop-types";
import StylePropTypes from "react-style-proptype";
import { Subscriber } from "react-broadcast";
import AdComposer from "./ad-composer";
import GPT from "./gpt";

class Ad extends Component {
  renderGpt(adManager) {
    return (
      <GPT
        adManager={adManager}
        code={this.props.code}
        style={[this.props.style, {
          alignItems: "center",
          flex: 1
        }]}
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
  style: StylePropTypes
};

Ad.defaultProps = {
  style: null
};

export default Ad;

export { AdComposer };
