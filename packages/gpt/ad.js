import React, { Component } from "react";
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

export default Ad;
