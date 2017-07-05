import React, { Component } from "react";
import PropTypes from "prop-types";
import { Broadcast } from "react-broadcast";

import AdManager from "./ad-manager";
import { getSlotConfig } from "./generate-config";
import gptManager from "./gpt-manager";
import pbjs from "./pbjs-manager";
import { pbjs as pbjsConfig } from "./config";

const pbjsManager = pbjs(pbjsConfig);

class AdComposer extends Component {
  constructor(props) {
    super(props);

    this.adManager = new AdManager({
      networkId: props.networkId,
      adUnit: "d.thetimes.co.uk",
      section: props.section,
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

AdComposer.propTypes = {
  networkId: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default AdComposer;
