import React, { Component } from "react";
import { Subscriber } from "react-broadcast";
import { View } from "react-native";
import { screenWidth } from "@times-components/utils";
import { getSlotConfig, prebidConfig, getPrebidSlotConfig } from "./utils";
import AdPlaceholder from "./ad-placeholder";
import DOMContext from "./dom-context";
import adInit from "./ad-init";
import AdComposer from "./ad-composer";
import { propTypes, defaultProps } from "./ad-prop-types";
import styles from "./styles";

class Ad extends Component {
  constructor(props) {
    super(props);

    const { slotName } = props;

    this.windowWidth = screenWidth();
    this.config = getSlotConfig(slotName, this.windowWidth);
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
      sizingMap: this.config.mappings,
      pageTargeting: adConfig.pageTargeting,
      slotTargeting: adConfig.slotTargeting
    };

    const sizeProps = !this.state.adReady
      ? { height: 0, width: 0 }
      : {
          height: this.config.maxSizes.height,
          width: this.config.maxSizes.width
        };

    const webviewComponent = (
      <DOMContext
        baseUrl={baseUrl}
        data={data}
        init={adInit}
        onRenderComplete={this.setAdReady}
        {...sizeProps}
      />
    );

    const placeholderComponent = !this.state.adReady ? (
      <AdPlaceholder
        height={this.config.maxSizes.height}
        style={styles.children}
        width={this.config.maxSizes.width}
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
