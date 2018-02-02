import React, { Component } from "react";
import PropTypes from "prop-types";
import { Broadcast } from "react-broadcast";

import AdManager from "./ad-manager";
import gptManager from "./gpt-manager";
import pbjs from "./pbjs-manager";
import { pbjs as pbjsConfig } from "./config";

const pbjsManager = pbjs(pbjsConfig);

class AdComposer extends Component {
  constructor(props) {
    super(props);

    this.adManager = new AdManager({
      networkId: props.networkId,
      adUnit: props.adUnit,
      section: props.section,
      adConfig: props.adConfig,
      gptManager,
      pbjsManager
    });
  }

  componentDidMount() {
    this.adManager
      .init()
      .then(this.adManager.display.bind(this.adManager))
      .catch(err => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <Broadcast channel="adChannel" value={this.adManager}>
        <div>{this.props.children}</div>
      </Broadcast>
    );
  }
}

AdComposer.propTypes = {
  networkId: PropTypes.string,
  adUnit: PropTypes.string,
  section: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  adConfig: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string,
    commercialtags: PropTypes.string,
    contentType: PropTypes.string
  })
};

AdComposer.defaultProps = {
  networkId: "25436805",
  adUnit: "d.thetimes.co.uk",
  adConfig: {
    id: "null",
    title: "null",
    label: "null",
    commercialtags: "null",
    contentType: "null"
  }
};

export default AdComposer;
