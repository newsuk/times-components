/* global window, nuk */

import React, { Component } from "react";
import localStorage from "store";
import PropTypes from "prop-types";
import { Broadcast } from "react-broadcast";
import { isSubscriber } from "@times-components/utils/is-subscriber";
import { cookieHelper } from "@times-components/utils/cookie-helper";

import AdManager from "./ad-manager";
import gptManager from "./gpt-manager";
import pbjs from "./pbjs-manager";
import { pbjs as pbjsConfig } from "./config";

const pbjsManager = pbjs(pbjsConfig);

class AdComposer extends Component {
  static getSubscriber() {
    return isSubscriber() ? "1" : "0";
  }

  static isLoggedIn() {
    return nuk.user.isLoggedIn ? "1" : "0";
  }

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
    const pageConfig = this.setPageLevelConfig(this.props.adConfig);
    this.adManager
      .init(pageConfig)
      .then(this.adManager.display.bind(this.adManager))
      .catch(err => {
        throw new Error(err);
      });
  }

  setPageLevelConfig(adConfig) {
    return {
      edition_id: window.nuk ? nuk.ads.editionDate : null,
      e_uuid: window.nuk ? nuk.ads.editionId : null,
      search: "null",
      share_token: "null",
      shared: "0",
      cont: adConfig.contentType,
      aid: adConfig.id,
      kw: `${adConfig.title} ${adConfig.label} ${
        adConfig.commercialtags
      }`.split(" "),
      pw: "1",
      teaser: window.nuk
        ? !nuk.user.isLoggedIn || nuk.user.isMeteredExpired
        : "0",
      log: window.nuk ? this.isLoggedIn() : "0",
      subscriber: window.nuk ? this.getSubscriber() : "0",
      kuid: localStorage.get("kxkuid"),
      ksg: localStorage.get("kxsegs"),
      ppid: cookieHelper.getCpnId() || "null",
      eid: cookieHelper.getCpnId() || "null",
      om_v_id: cookieHelper.getVistorId() || "null",
      cips: cookieHelper.getCips() || "null",
      refresh: "false"
    };
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
