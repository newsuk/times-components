import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, Linking } from "react-native";
import { getSlotConfig } from "./generate-config";
import { pbjs as pbjsConfig } from "./config";
import WebViewAutoHeight from "./webview-auto-height";

const { width } = Dimensions.get("window");

class Ad extends Component {
  static onOriginChange(url) {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          return console.error("Cant open url", url);
        }
        return Linking.openURL(url);
      })
      .catch(err => console.error("An error occurred", err));
  }

  constructor(props) {
    super(props);
    this.config = getSlotConfig(props.section, props.code, width);
  }

  render() {
    const html = `
      <html>
        <head>
          <script async src="https://www.thetimes.co.uk/d/js/vendor/prebid.min-4812861170.js"></script>
          <script async src="https://www.googletagservices.com/tag/js/gpt.js"></script>
        </head>
        <body>
          <div id='${this.config.code}'>
          </div>

          <script>
            const config = ${JSON.stringify(this.config)};
            var PREBID_TIMEOUT = ${pbjsConfig.timeout};
            var adUnits = [{
                code: config.code,
                sizes: config.sizes,
                bids: config.bids
            }];

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

    return (
      <WebViewAutoHeight
        source={{ html }}
        baseUrl={this.props.baseUrl}
        onOriginChange={Ad.onOriginChange}
      />
    );
  }
}

Ad.propTypes = {
  networkId: PropTypes.string,
  adUnit: PropTypes.string,
  code: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  baseUrl: PropTypes.string
};

Ad.defaultProps = {
  networkId: "25436805",
  adUnit: "d.thetimes.co.uk",
  baseUrl: "https://example.com"
};

export default Ad;
