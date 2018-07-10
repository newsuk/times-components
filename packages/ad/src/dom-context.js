import React, { PureComponent } from "react";
import { WebView, View, Linking, Platform } from "react-native";
import webviewEventCallbackSetup from "./utils/webview-event-callback-setup";
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
    const json = e.nativeEvent.data;
    if (json.indexOf("isTngMessage") === -1) {
      // don't try and process postMessage events from 3rd party scripts
      return;
    }
    const { type, detail } = JSON.parse(json);
    if (type === "error" && process.env.NODE_ENV !== "production") {
      // don't throw in production because 3rd party scripts in WebView can error
      throw new Error(`Error inside WebView: ${detail}`);
    }
    if (type === "renderComplete") {
      this.props.onRenderComplete();
    } else if (type === "log") {
      console.log(detail); // eslint-disable-line no-console
    }
  };

  handleNavigationStateChange = ({ url }) => {
    const reactPostmessageBridgePrefix = "react-js-navigation://";
    if (
      url.indexOf(reactPostmessageBridgePrefix) !== 0 &&
      DOMContext.hasDifferentOrigin(url, this.props.baseUrl)
    ) {
      this.webView.stopLoading();
      DOMContext.openURLInBrowser(url);
    }
  };

  render() {
    const { data, init, width, height } = this.props;
    // NOTE: if this generated code is not working, and you don't know why
    // because React Native doesn't report errors in webview JS code, try
    // connecting a debugger to the app, console.log(html), copy and paste
    // the HTML into a file and run it in a browser.
    const html = `
      <html>
        <head>
        <meta name="viewport" content="width=${width},height=${
      height
    },initial-scale=1,user-scalable=no">
        <style>
          html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
        </style>
        </head>
        <body>
          <div></div>
          <script>
            (${webviewEventCallbackSetup})(window);
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
    const postMessageBugWorkaround = Platform.select({
      // https://github.com/facebook/react-native/issues/10865
      ios: {
        injectedJavaScript:
          "window.reactBridgePostMessage = window.postMessage; window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');"
      }
    });
    return (
      <View style={{ width, height }}>
        <WebView
          onMessage={this.handleMessageEvent}
          onNavigationStateChange={this.handleNavigationStateChange}
          ref={ref => {
            this.webView = ref;
          }}
          source={{ html, baseUrl: this.props.baseUrl }}
          style={{ backgroundColor: "transparent" }}
          {...postMessageBugWorkaround}
        />
      </View>
    );
  }
}

DOMContext.propTypes = propTypes;
DOMContext.defaultProps = defaultProps;

export default DOMContext;
