import React, { Component } from "react";
import { Broadcast } from "react-broadcast";

import gptManager from "./gpt-manager";
import pbjsManager from "./pbjs-manager";
import { getSlotConfig } from "./generate-config";
import AdManager from "./ad-manager";

class AdComposer extends Component {
  constructor(props) {
    super(props);

    this.adManager = new AdManager({
      networkId: "25436805",
      adUnit: "d.thetimes.co.uk",
      section: "article",
      gptManager,
      pbjsManager,
      getSlotConfig
    });
  }

  componentDidMount() {
    this.adManager.init(() => {
      this.adManager.display();
    });
  }

  render() {
    return (
      <Broadcast channel="adChannel" value={this.adManager}>
        <div>
          {this.props.children}
        </div>
      </Broadcast>
    );
  }
}

export default AdComposer;
