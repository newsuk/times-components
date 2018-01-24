import React, { Component } from "react";
import localStorage from 'store';
import PropTypes from "prop-types";
import { Broadcast } from "react-broadcast";

import AdManager from "./ad-manager";
import gptManager from "./gpt-manager";
import pbjs from "./pbjs-manager";
import { pbjs as pbjsConfig } from "./config";

import cookieHelper from './helpers/cookie-helper';
import isSubscriber from './helpers/is-subscriber';

const pbjsManager = pbjs(pbjsConfig);

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

  setPageLevelConfig(adConfig) {
    return {
      edition_id: window.nuk ? nuk.ads.editionDate : null,
      e_uuid: window.nuk ? nuk.ads.editionId: null,
      search: 'null',
      share_token: 'null',
      shared: '0',
      cont: adConfig.contentType,
      aid: adConfig.id,
      kw: `${adConfig.title} ${adConfig.label} ${adConfig.commercialtags}`.split(' '),
      pw: '1',
      teaser: window.nuk ? (!nuk.user.isLoggedIn || nuk.user.isMeteredExpired) : '0',
      log: window.nuk ? (nuk.user.isLoggedIn ? '1' : '0') : '0',
      subscriber: window.nuk ? (isSubscriber() ? '1' : '0'): '0',
      kuid: localStorage.get('kxkuid'),
      ksg: localStorage.get('kxsegs'),
      ppid: cookieHelper.getCpnId(cookieHelper.getCookieValue('acs_tnl')) || 'null',
      eid: cookieHelper.getCpnId(cookieHelper.getCookieValue('acs_tnl')) || 'null',
      om_v_id: cookieHelper.getVistorId(cookieHelper.getCookieValue('utag_main')) || 'null',
      cips: cookieHelper.getCips(cookieHelper.getCookieValue('acs_tnl')),
      refresh: "false"
    }
  }

  componentDidMount() {
    const pageConfig =  this.setPageLevelConfig(this.props.adConfig);
    this.adManager
      .init(pageConfig)
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
  pageOptions: PropTypes.object
};

AdComposer.defaultProps = {
  networkId: "25436805",
  adUnit: "d.thetimes.co.uk"
};

export default AdComposer;
