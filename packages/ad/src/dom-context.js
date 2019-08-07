import React, { PureComponent } from "react";
import { View, Linking, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { Viewport } from "@skele/components";
import DeviceInfo from "react-native-device-info";
import webviewEventCallbackSetup from "./utils/webview-event-callback-setup";
import logger from "./utils/logger";
import { propTypes, defaultProps } from "./dom-context-prop-types";
import { calculateViewportVisible } from "./styles/index";

const ViewportAwareView = Viewport.Aware(View);

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

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.deviceInfo = {
      applicationName: DeviceInfo.getApplicationName(),
      buildNumber: DeviceInfo.getBuildNumber(),
      bundleId: DeviceInfo.getBundleId(),
      deviceId: DeviceInfo.getDeviceId(),
      readableVersion: DeviceInfo.getReadableVersion(),
      version: DeviceInfo.getVersion()
    };
  }

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

  handleMessageEvent = e => {
    const { onRenderComplete, onRenderError, data } = this.props;
    const json = e.nativeEvent.data;
    if (
      json.indexOf("isTngMessage") === -1 &&
      json.indexOf("unrulyLoaded") === -1
    ) {
      // don't try and process postMessage events from 3rd party scripts
      return;
    }
    const { type, detail } = JSON.parse(json);
    const { loaded } = this.state;
    const { isVisible } = this;
    switch (type) {
      case "renderFailed":
        onRenderError();
        break;
      case "unrulyLoaded": {
        if (loaded && isVisible) {
          this.inViewport();
        }
        break;
      }
      case "renderComplete":
        onRenderComplete();
        break;
      default:
        if (data.debug) {
          logger(type, detail);
        }
    }
  };

  outViewport = () => {
    this.isVisible = false;
    if (this.webView) {
      this.webView.injectJavaScript(`
          if (typeof unrulyViewportStatus === "function") {
            unrulyViewportStatus(false);
          };
        `);
    }
  };

  loadAd = () => {
    this.setState({
      loaded: true
    });
  };

  inViewport = () => {
    this.isVisible = true;
    if (this.webView) {
      this.webView.injectJavaScript(`
          if (typeof unrulyViewportStatus === "function") {
            unrulyViewportStatus(${JSON.stringify({
              ...this.deviceInfo,
              visible: true
            })})
          };
        `);
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
            window.postMessage = function(data) {
              var message = typeof data === "string" ? data : JSON.stringify(data);
              window.ReactNativeWebView.postMessage(message);
            };
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
    const { loaded } = this.state;
    return (
      <ViewportAwareView
        onViewportEnter={this.loadAd}
        style={{
          height,
          width
        }}
      >
        {loaded && (
          <WebView
            onMessage={this.handleMessageEvent}
            onNavigationStateChange={this.handleNavigationStateChange}
            originWhitelist={
              Platform.OS === "android"
                ? ["http://.*", "https://.*"]
                : undefined
            }
            ref={ref => {
              this.webView = ref;
            }}
            source={{
              baseUrl,
              html
            }}
            style={{ position: "absolute", width, height }}
          />
        )}
        {height !== 0 && (
          <ViewportAwareView
            onViewportEnter={this.inViewport}
            onViewportLeave={this.outViewport}
            style={calculateViewportVisible(height)}
          />
        )}
      </ViewportAwareView>
    );
  }
}

DOMContext.propTypes = propTypes;
DOMContext.defaultProps = defaultProps;

export default DOMContext;
