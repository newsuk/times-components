import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, WebView, Dimensions, Linking, StyleSheet } from "react-native";
import { getSlotConfig } from "./generate-config";
import { pbjs as pbjsConfig } from "./config";

import Placeholder from "./placeholder";

const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  children: {
    position: "absolute",
    left: 0,
    right: 0
  }
});

class Ad extends Component {
  static hasDifferentOrigin(url, baseUrl) {
    return url && url.indexOf(baseUrl) === -1 && url.indexOf("://") > -1;
  }

  static hasAdReady(message) {
    return message ? message.indexOf("AD_READY") > -1 : false;
  }

  static onOriginChange(url) {
    return Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          return console.error("Cant open url", url); // eslint-disable-line no-console
        }
        return Linking.openURL(url);
      })
      .catch(err => console.error("An error occurred", err)); // eslint-disable-line no-console
  }

  constructor(props) {
    super(props);
    const { width } = Dimensions.get("window");
    this.config = getSlotConfig(props.section, props.code, width);
    this.viewBorder = 10;

    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleNavigationChange = this.handleNavigationChange.bind(this);
    this.setAdReady = this.setAdReady.bind(this);

    this.state = {
      adReady: false
    };
  }

  setAdReady() {
    this.setState({
      adReady: true
    });
  }

  handleOriginChange(url) {
    if (Ad.hasDifferentOrigin(url, this.props.baseUrl)) {
      this.webview.stopLoading();
      Ad.onOriginChange(url);
    }
  }

  handleNavigationChange(navState) {
    // NOTE: we're using title here to send messages between the webview and the Ad component
    if (Ad.hasAdReady(navState.title)) {
      this.setAdReady();
    }

    this.handleOriginChange(navState.url);
  }

  render() {
    const html = `
      <html>
        <head>
          <style>
            body {
              margin: 0 auto;
              display: table;
              height: 100%;
              width: 100%;
              text-align: center;
            }
            div#${this.props.code} {
              display: table-cell;
              vertical-align: middle;
            }
          </style>
          <script async src="https://www.thetimes.co.uk/d/js/vendor/prebid.min-4812861170.js"></script>
          <script async src="https://www.googletagservices.com/tag/js/gpt.js"></script>
        </head>
        <body>
          <div id='${this.config.code}'>
          </div>

          <script>
            var i = 0;
            const config = ${JSON.stringify(this.config)};
            var PREBID_TIMEOUT = ${pbjsConfig.timeout};
            var adUnits = [{
                code: config.code,
                sizes: config.sizes,
                bids: config.bids
            }];

            function notifyAdReady() {
              document.title = 'AD_READY';
              window.location.hash = ++i;
            }

            function initPrebidDefaults() {
              window.pbjs = window.pbjs || {};
              pbjs.que = pbjs.que || [];
            }

            function addServices () {
              googletag.cmd.push(function () {
                const slotName = '/${this.props.networkId}/${this.props
      .adUnit}/${this.props.section}';
                googletag
                  .defineSlot(slotName, config.sizes, config.code)
                  .addService(googletag.pubads());

                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
            }

            function sendAdserverRequest () {
              if (pbjs.adserverRequestSent) return;
              notifyAdReady();
              pbjs.adserverRequestSent = true;
              googletag.cmd.push(function() {
                pbjs.que.push(function() {
                  pbjs.setTargetingForGPTAsync();
                  googletag.display(config.code);
                  googletag.pubads().refresh();
                });
              });
            }

            function initGoogleTagDefaults () {
              window.googletag = window.googletag || {};
              googletag.cmd = googletag.cmd || [];
              googletag.cmd.push(function() {
                googletag.pubads().disableInitialLoad();
              });

              addServices();

              pbjs.que.push(function() {
                pbjs.addAdUnits(adUnits);
                pbjs.requestBids({
                  bidsBackHandler: sendAdserverRequest
                });
              });

              setTimeout(function() {
                sendAdserverRequest();
              }, PREBID_TIMEOUT);
            }

            function init () {
              initPrebidDefaults();
              initGoogleTagDefaults();
            }
            init();

          </script>
        </body>
      </html>
      `;

    const placeholderComponent = !this.state.adReady
      ? <Placeholder
          width={this.config.maxSizes.width}
          height={this.config.maxSizes.height}
          style={styles.children}
        />
      : null;

    const webviewStyles = !this.state.adReady
      ? {
          width: 0,
          height: 0
        }
      : {
          height: this.config.maxSizes.height + this.viewBorder
        };

    const webviewComponent = (
      <WebView
        ref={ref => {
          this.webview = ref;
        }}
        source={{ html, baseUrl: this.props.baseUrl }}
        style={[webviewStyles, styles.children]}
        baseUrl={this.props.baseUrl}
        onNavigationStateChange={this.handleNavigationChange}
      />
    );

    return (
      <View style={[styles.container, this.props.style]}>
        {placeholderComponent}
        {webviewComponent}
      </View>
    );
  }
}

Ad.propTypes = {
  networkId: PropTypes.string,
  adUnit: PropTypes.string,
  code: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  baseUrl: PropTypes.string,
  style: PropTypes.instanceOf(StyleSheet)
};

Ad.defaultProps = {
  networkId: "25436805",
  adUnit: "d.thetimes.co.uk",
  baseUrl: "https://www.thetimes.co.uk/",
  style: null
};

export default Ad;
