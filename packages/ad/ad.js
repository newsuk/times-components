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
    this.config = getSlotConfig(props.section, props.pos, width);
    this.prebidConfig = prebidConfig;
    this.state = {
      adReady: false
    };
    this.slots = [];
    const slotsBid = ["ad-header", "ad-article-inline", "intervention"];
    if (slotsBid.includes(this.props.pos)) {
      // TODO check article
      this.slots.push(getPrebidSlotConfig(this.props.pos, "article", width));
    }
  }

  setAdReady = () => {
    this.setState({
      adReady: true
    });
  };

  renderAd(adConfig) {
    const data = {
      config: this.config,
      prebidConfig: this.prebidConfig,
      // TODO
      slots: this.slots,
      pos: this.props.pos,
      networkId: adConfig.networkId,
      adUnit: adConfig.adUnit,
      contextUrl: this.props.contextUrl,
      section: this.props.section,
      sizingMap: getSizeMaps(this.props.pos),
      pageTargeting: adConfig.pageTargeting,
      slotTargeting: Object.assign(adConfig.slotTargeting, {
        pos: this.props.pos
      })
    };

    const sizeProps = !this.state.adReady
      ? { width: 0, height: 0 }
      : { height: this.config.maxSizes.height };
    const scriptsToLoad = [];
    this.prebidConfig.bidders.amazon.accountId = null;
    if (this.prebidConfig.bidders.amazon.accountId) {
      scriptsToLoad.push({
        uri: "https://c.amazon-adsystem.com/aax2/apstag.js"
      });
    }
    scriptsToLoad.push(
      {
        uri: "https://www.thetimes.co.uk/d/js/vendor/prebid.min-4812861170.js"
      },
      {
        uri: `https://newscorp.grapeshot.co.uk/thetimes/channels.cgi?url=${encodeURIComponent(
          data.contextUrl
        )}`,
        canRequestFail: true,
        timeout: 500
      }
      ,{
        uri: "https://www.googletagservices.com/tag/js/gpt.js"
      }
    );
    const webviewComponent = (
      <DOMContext
        data={data}
        scriptUris={scriptsToLoad}
        globalNames={["googletag", "gs_channels", "pbjs", "apstag"]}
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
  networkId: "25436805",
  adUnit: "d.thetimes.co.uk",
  section: "article",
  baseUrl: "https://www.thetimes.co.uk/",
  contextUrl: "",
  style: null,
  amazonAccountID: null
};

export default Ad;

export { AdComposer };
