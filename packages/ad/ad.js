import React, { Component } from "react";
import PropTypes from "prop-types";
import { Subscriber } from "react-broadcast";
import { View, ViewPropTypes, Dimensions, StyleSheet } from "react-native";
import { getSlotConfig, getSizeMaps } from "./generate-config";
import { prebidConfig, getPrebidSlotConfig } from "./prebid-config";
import Placeholder from "./placeholder";
import DOMContext from "./dom-context";
import adInit from "./ad-init";
import AdComposer from "./ad-composer";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const styles = StyleSheet.create({
  children: {
    flex: 1
  }
});

class Ad extends Component {
  constructor(props) {
    super(props);
    const { width } = Dimensions.get("window");
    this.windowWidth = width;
    this.config = getSlotConfig(props.section, props.pos, this.windowWidth);
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
      pos: this.props.pos,
      networkId: adConfig.networkId,
      adUnit: adConfig.adUnit,
      contextUrl: this.props.contextUrl,
      section: this.props.section,
      sizingMap: getSizeMaps(this.props.pos),
      pageTargeting: adConfig.pageTargeting,
      slotTargeting: adConfig.slotTargeting
    };

    const sizeProps = !this.state.adReady
      ? { width: 0, height: 0 }
      : { height: this.config.maxSizes.height };

    const webviewComponent = (
      <DOMContext
        data={data}
        baseUrl={this.props.baseUrl}
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
      <View style={[this.props.style]}>
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

Ad.propTypes = {
  networkId: PropTypes.string,
  adUnit: PropTypes.string,
  pos: PropTypes.string.isRequired,
  section: PropTypes.string,
  baseUrl: PropTypes.string,
  contextUrl: PropTypes.string,
  style: ViewPropTypesStyle,
  amazonAccountID: PropTypes.string
};

// NOTE, these values are temporary, adding real values (or removing defaults
// altogether) will be done in REPLAT-591 and REPLAT-592
Ad.defaultProps = {
  networkId: "3048",
  adUnit: "d.thetimes.co.uk",
  section: "news",
  baseUrl: "https://www.thetimes.co.uk/",
  contextUrl: "",
  style: null,
  amazonAccountID: null
};

export default Ad;

export { AdComposer };
