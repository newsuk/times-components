import React, { PureComponent } from "react";
import { View, Linking } from "react-native";
import { WebView } from "react-native-webview";
import webviewEventCallbackSetup from "./utils/webview-event-callback-setup";
import logger from "./utils/logger";
import { propTypes, defaultProps } from "./dom-context-prop-types";

class DOMContext extends PureComponent {
  static hasDifferentOrigin(url, baseUrl) {
    return url && url.indexOf(baseUrl) === -1 && url.indexOf("://") > -1;
  }

  static openURLInBrowser(url) {
    return Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          return console.error("Cant open url", url); // eslint-disable-line no-console
        }
        return Linking.openURL(url);
      })
      .catch(err => console.error("An error occurred", err)); // eslint-disable-line no-console
  }

  handleMessageEvent = e => {
    const { onRenderComplete, onRenderError, data } = this.props;
    const json = e.nativeEvent.data;
    if (json.indexOf("isTngMessage") === -1) {
      // don't try and process postMessage events from 3rd party scripts
      return;
    }
    const { type, detail } = JSON.parse(json);
    switch (type) {
      case "renderFailed":
        onRenderError();
        break;
      case "renderComplete":
        onRenderComplete();
        break;
      default:
        if (data.debug) {
          logger(type, detail);
        }
    }
  };

  handleNavigationStateChange = ({ url }) => {
    const { baseUrl } = this.props;
    const reactPostmessageBridgePrefix = "react-js-navigation://";
    if (
      url.indexOf(reactPostmessageBridgePrefix) !== 0 &&
      DOMContext.hasDifferentOrigin(url, baseUrl)
    ) {
      this.webView.stopLoading();
      DOMContext.openURLInBrowser(url);
    }
  };

  render() {
    const { baseUrl, data, init, width, height } = this.props;
    // NOTE: if this generated code is not working, and you don't know why
    // because React Native doesn't report errors in webview JS code, try
    // connecting a debugger to the app, console.log(html), copy and paste
    // the HTML into a file and run it in a browser.
    const html = `
      <html>
        <head>
        <meta name="viewport" content="width=${width},height=${height},initial-scale=1,user-scalable=no">
        <style>
          html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
        </style>
        <script>
          window.googletag = window.googletag || {};
          window.googletag.cmd = window.googletag.cmd || [];
          window.pbjs = window.pbjs || {};
          window.pbjs.que = window.pbjs.que || [];
          window.apstag = {
            _Q: [],
            addToQueue(action, d) {
              this._Q.push([action, d]);
            },
            fetchBids() {
              this.addToQueue("f", arguments);
            },
            init() {
              this.addToQueue("i", arguments);
            },
            setDisplayBids() {},
            targetingKeys() {
              return [];
            }
          };
        </script>
        </head>
        <body>
          <div></div>
          <script>
            window.postMessage = function(data) {window.ReactNativeWebView.postMessage(data);};
            (${webviewEventCallbackSetup})({window});
          </script>
          <script>
          (${init})({
            el: document.getElementsByTagName("div")[0],
            eventCallback: eventCallback,
            data: ${JSON.stringify(data)},
            platform: "native",
            window
          }).init();
          </script>
        </body>
      </html>
    `;
    return (
      <View
        style={{
          height,
          width
        }}
      >
        <WebView
          androidHardwareAccelerationDisabled
          onMessage={this.handleMessageEvent}
          onNavigationStateChange={this.handleNavigationStateChange}
          ref={ref => {
            this.webView = ref;
          }}
          source={{
            baseUrl,
            html
          }}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  }
}

DOMContext.propTypes = propTypes;
DOMContext.defaultProps = defaultProps;

export default DOMContext;
