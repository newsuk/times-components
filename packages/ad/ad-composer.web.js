import React, { Component } from "react";
import PropTypes from "prop-types";
import { Broadcast } from "react-broadcast";

import AdManager from "./ad-manager";
import gptManager from "./gpt-manager";
import pbjsManager from "./pbjs-manager";

class AdComposer extends Component {
  constructor(props) {
    super(props);

    this.adManager = new AdManager({
      networkId: props.networkId,
      adUnit: props.adUnit,
      section: props.section,
      gptManager,
      pbjsManager
    });
  }

  componentDidMount() {
    this.adManager.getAds();
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
  adUnit: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

AdComposer.defaultProps = {
  networkId: "25436805",
  adUnit: "d.thetimes.co.uk"
};

export default AdComposer;
