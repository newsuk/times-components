/* eslint-disable no-undef */
import React, { Component } from "react";
import { Subscriber } from "react-broadcast";
import {
  screenWidth,
  ServerClientRender,
  TcView
} from "@times-components/utils";
import { getPrebidSlotConfig, getSlotConfig, prebidConfig } from "./utils";
import adInit from "./utils/ad-init";
import AdContainer from "./ad-container";
import DOMContext from "./dom-context";
import AdComposer from "./ad-composer";
import { defaultProps, propTypes } from "./ad-prop-types";
import styles from "./styles";

class Ad extends Component {
  static getDerivedStateFromProps(nextProps) {
    const { slotName } = nextProps;

    return {
      config: getSlotConfig(slotName, screenWidth())
    };
  }

  constructor(props) {
    super(props);

    const { slotName } = props;

    this.prebidConfig = prebidConfig;

    this.state = {
      config: getSlotConfig(slotName, screenWidth()),
      hasError: false,
      isAdReady: false,
      hasAdBlock: false
    };
  }

  componentDidMount() {
    this.setState({
      hasAdBlock: window.hasAdBlock
    });
  }

  setAdReady = () => {
    this.setState({
      isAdReady: true
    });
  };

  setAdError = () => {
    this.setState({
      hasError: true
    });
  };

  renderAd(adConfig) {
    const {
      baseUrl,
      contextUrl,
      isLoading,
      section,
      slotName,
      style
    } = this.props;
    const { config, hasError, isAdReady, hasAdBlock } = this.state;

    if (hasAdBlock || hasError) return null;

    this.slots = adConfig.bidderSlots.map(slot =>
      getPrebidSlotConfig(
        slot,
        section,
        config.maxSizes.width,
        adConfig.biddersConfig.bidders
      )
    );

    this.allSlotConfigs = adConfig.globalSlots
      .concat(adConfig.bidderSlots)
      .map(slot => getSlotConfig(slot, screenWidth()));

    const data = {
      adUnit: adConfig.adUnit,
      allSlotConfigs: this.allSlotConfigs || this.slots,
      bidInitialiser: adConfig.bidInitialiser || false,
      config,
      contextUrl,
      debug: adConfig.debug || false,
      disableAds: adConfig.disabled || false,
      networkId: adConfig.networkId,
      pageTargeting: adConfig.pageTargeting,
      prebidConfig: Object.assign(this.prebidConfig, {
        bidders: adConfig.biddersConfig.bidders,
        bucketSize: adConfig.biddersConfig.bucketSize,
        maxBid: adConfig.biddersConfig.maxBid,
        minPrice: adConfig.biddersConfig.minPrice,
        timeout: adConfig.biddersConfig.timeout
      }),
      section,
      sizingMap: config.mappings,
      slotName,
      slots: this.slots,
      slotTargeting: adConfig.slotTargeting
    };

    const sizeProps = !isAdReady
      ? { height: 0, width: 0 }
      : {
          height: config.maxSizes.height,
          width: config.maxSizes.width
        };

    const adView = (
      <TcView style={{ ...styles.container, ...style }}>
        {isLoading ? null : (
          <DOMContext
            baseUrl={baseUrl}
            data={data}
            init={adInit}
            onRenderComplete={this.setAdReady}
            onRenderError={this.setAdError}
            {...sizeProps}
          />
        )}
      </TcView>
    );

    return <ServerClientRender client={() => adView} server={null} />;
  }

  render() {
    const { adConfig: propAdConfig } = this.props;
    if (propAdConfig) {
      return this.renderAd(propAdConfig);
    }
    return (
      <Subscriber channel="adConfig">
        {adConfig => this.renderAd(adConfig)}
      </Subscriber>
    );
  }
}

Ad.propTypes = propTypes;
Ad.defaultProps = defaultProps;

export { AdComposer, AdContainer };
export default Ad;
