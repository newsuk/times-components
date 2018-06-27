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
      adReady: false,
      config: getSlotConfig(slotName, screenWidth())
    };
  }

  setAdReady = () => {
    this.setState({
      adReady: true
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
    const { windowWidth } = this.state;

    this.slots = adConfig.bidderSlots.map(slot =>
      getPrebidSlotConfig(
        slot,
        "article",
        windowWidth,
        adConfig.biddersConfig.bidders
      )
    );

    const data = {
      config: this.state.config,
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
      sizingMap: this.state.config.mappings,
      pageTargeting: adConfig.pageTargeting,
      slotTargeting: adConfig.slotTargeting
    };

    const sizeProps = !this.state.adReady
      ? { height: 0, width: 0 }
      : {
          height: this.state.config.maxSizes.height,
          width: this.state.config.maxSizes.width
        };

    const AdComponent = (
      <DOMContext
        baseUrl={baseUrl}
        data={data}
        init={adInit}
        onRenderComplete={this.setAdReady}
        {...sizeProps}
      />
    );

    const AdPlaceholderComponent = (
      <AdPlaceholder
        height={this.state.config.maxSizes.height}
        style={styles.children}
        width={this.state.config.maxSizes.width}
      />
    );

    return (
      <View style={[style]}>
        {isLoading ? null : AdComponent}
        {isLoading || !this.state.adReady ? AdPlaceholderComponent : null}
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
