import React, { Component } from "react";
import PropTypes from "prop-types";

import { Subscriber } from "react-broadcast";

import GPT from "./gpt.web";

class Ad extends Component {
  _render(adManager, props) {
    return <GPT adManager={adManager} code={props.code} />;
  }

  render() {
    return (
      <Subscriber channel="adChannel">
        {adManager => this._render(adManager, this.props)}
      </Subscriber>
    );
  }
}

Ad.propTypes = {
  code: PropTypes.string.isRequired
};

export default Ad;
