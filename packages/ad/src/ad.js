import React, { Component } from "react";
import { Subscriber } from "react-broadcast";
import { View, StyleSheet } from "react-native";
import { screenWidth } from "@times-components/utils";
import { getSlotConfig, getSizeMaps } from "./generate-config";
import { prebidConfig, getPrebidSlotConfig } from "./prebid-config";
import Placeholder from "./placeholder";
import DOMContext from "./dom-context";
import adInit from "./ad-init";
import AdComposer from "./ad-composer";
import { propTypes, defaultProps } from "./ad-prop-types";

const styles = StyleSheet.create({
  children: {
    flex: 1
  }
});

class Ad extends Component {
  constructor(props) {
    super(props);

    const { section, slotName } = props;

    this.windowWidth = screenWidth();
    this.config = getSlotConfig(section, slotName, this.windowWidth);
    this.prebidConfig = prebidConfig;
    this.state = {
      adReady: false
    };
  }

  setAdReady = () => {
    this.setState({
      adReady: true
    });
  };

  renderAd(adConfig) {
    const { slotName, contextUrl, section, baseUrl, style } = this.props;

    this.slots = adConfig.bidderSlots.map(slot =>
      getPrebidSlotConfig(
        slot,
        "article",
        this.windowWidth,
        adConfig.biddersConfig.bidders
      )
    );

    const data = {
      config: this.config,
      prebidConfig: Object.assign(this.prebidConfig, {
        bidders: adConfig.biddersConfig.bidders,
        timeout: adConfig.biddersConfig.timeout,
        minPrice: adConfig.biddersConfig.minPrice,
        maxBid: adConfig.biddersConfig.maxBid,
        bucketSize: adConfig.biddersConfig.bucketSize
      }),
      slots: this.slots || [],
      slotName,
      networkId: adConfig.networkId,
      adUnit: adConfig.adUnit,
      contextUrl,
      section,
      sizingMap: getSizeMaps(slotName),
      pageTargeting: adConfig.pageTargeting,
      slotTargeting: adConfig.slotTargeting
    };

    const sizeProps = !this.state.adReady
      ? { width: 0, height: 0 }
      : { height: this.config.maxSizes.height };

    const webviewComponent = (
      <DOMContext
        data={data}
        baseUrl={baseUrl}
        init={adInit}
        onRenderComplete={this.setAdReady}
        {...sizeProps}
      />
    );

    const placeholderComponent = !this.state.adReady ? (
      <Placeholder
        width={this.config.maxSizes.width}
        height={this.config.maxSizes.height}
        style={styles.children}
      />
    ) : null;

    return (
      <View style={[style]}>
        {webviewComponent}
        {placeholderComponent}
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
