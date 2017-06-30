import React, { Component } from "react";
import { Broadcast } from "react-broadcast";

import AdManager from "./ad-manager";

class AdComposer extends Component {
  constructor(props) {
    super(props);

    this.adManager = new AdManager({
      networkId: "25436805",
      adUnit: "d.thetimes.co.uk",
      section: "article",
      gptManager: require("./gpt-manager").default,
      pbjsManager: require("./pbjs-manager").default
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
