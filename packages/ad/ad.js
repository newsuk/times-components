import React, { Component } from "react";
import PropTypes from "prop-types";
import { Subscriber } from "react-broadcast";
import { View, ViewPropTypes, Dimensions, StyleSheet } from "react-native";
import { getSlotConfig, getSizeMaps } from "./generate-config";
import Placeholder from "./placeholder";
import DOMContext from "./dom-context";
import adInit from "./ad-init";
import AdComposer from "./ad-composer";
import slotOptions from "./fixtures/slot-options.json";

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
    this.config = getSlotConfig(props.section, props.code, width);

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
    const data = {
      config: this.config,
      code: this.props.code,
      networkId: adConfig.networkId,
      adUnit: adConfig.adUnit,
      section: this.props.section,
      pos: this.props.pos,
      sizingMap: getSizeMaps(this.props.code),
      pageTargeting: adConfig.pageTargeting,
      slotOptions: { ...slotOptions, pos: this.props.pos }
    };

    const sizeProps = !this.state.adReady
      ? { width: 0, height: 0 }
      : { height: this.config.maxSizes.height };

    const webviewComponent = (
      <DOMContext
        data={data}
        scriptUris={["https://www.googletagservices.com/tag/js/gpt.js"]}
        globalNames={["googletag"]}
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
  code: PropTypes.string.isRequired,
  section: PropTypes.string,
  pos: PropTypes.string,
  baseUrl: PropTypes.string,
  style: ViewPropTypesStyle
};

// NOTE, these values are temporary, adding real values (or removing defaults
// altogether) will be done in REPLAT-591 and REPLAT-592
Ad.defaultProps = {
  networkId: "25436805",
  adUnit: "d.thetimes.co.uk",
  section: "article",
  pos: "article-ad",
  baseUrl: "https://www.thetimes.co.uk/",
  style: null
};

export default Ad;

export { AdComposer };
