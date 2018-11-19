import React, { Component } from "react";
import { Subscriber } from "react-broadcast";
import { View } from "react-native";
import { screenWidth } from "@times-components/utils";
import { getSlotConfig, prebidConfig, getPrebidSlotConfig } from "./utils";
import adInit from "./utils/ad-init";
import AdPlaceholder from "./ad-placeholder";
import DOMContext from "./dom-context";
import AdComposer from "./ad-composer";
import { propTypes, defaultProps } from "./ad-prop-types";
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
      isAdReady: false
    };
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
    const { config, hasError, isAdReady, windowWidth } = this.state;

    if (hasError) return null;

    this.slots = adConfig.bidderSlots.map(slot =>
      getPrebidSlotConfig(
        slot,
        "article",
        windowWidth,
        adConfig.biddersConfig.bidders
      )
    );

    const data = {
      adUnit: adConfig.adUnit,
      config,
      contextUrl,
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

    const AdComponent = (
      <DOMContext
        baseUrl={baseUrl}
        data={data}
        init={adInit}
        onRenderComplete={this.setAdReady}
        onRenderError={this.setAdError}
        {...sizeProps}
      />
    );

    const AdPlaceholderComponent = (
      <AdPlaceholder
        height={config.maxSizes.height}
        style={styles.children}
        width={config.maxSizes.width}
      />
    );

    return (
      <View style={[styles.container, style]}>
        {isLoading ? null : AdComponent}
        {isLoading || !isAdReady ? AdPlaceholderComponent : null}
      </View>
    );
  }

  render() {
    return (
      <Subscriber channel="adConfig">
        {adConfig => this.renderAd(adConfig)}
      </Subscriber>
    );
  }
}

Ad.propTypes = propTypes;
Ad.defaultProps = defaultProps;

export { AdComposer };
export default Ad;
