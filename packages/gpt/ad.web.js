import React, { Component } from "react";
import PropTypes from "prop-types";

import { Subscriber } from "react-broadcast";

import GPT from "./gpt.web";

class Ad extends Component {
  renderGpt(adManager) {
    return <GPT adManager={adManager} code={this.props.code} />;
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
  code: PropTypes.string.isRequired
};

export default Ad;
