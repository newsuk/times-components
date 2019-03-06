import React, { Component } from "react";
import { Linking, Platform, View, WebView } from "react-native";
import PropTypes from "prop-types";
import webviewEventCallbackSetup from "./webview-event-callback-setup";

const editorialLambdaProtocol = "https://";
const editorialLambdaOrigin = "cwfiyvo20d.execute-api.eu-west-1.amazonaws.com";
const editorialLambdaSlug = "dev/component";

class InteractiveWrapper extends Component {
  static postMessageBugWorkaround() {
    return Platform.select({
      android: {
        injectedJavaScript: `(${webviewEventCallbackSetup})({window, os: "${
          Platform.OS
        }"});`
      },
      // https://github.com/facebook/react-native/issues/10865
      ios: {
        injectedJavaScript: `window.reactBridgePostMessage = window.postMessage; window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage'); (${webviewEventCallbackSetup})({window, os: "${
          Platform.OS
        }"});`
      }
    });
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

  constructor() {
    super();
    this.state = {
      height: 0
    };
    this.onMessage = this.onMessage.bind(this);
    this.handleNavigationStateChange = this.handleNavigationStateChange.bind(
      this
    );
    this.onLoadEnd = this.onLoadEnd.bind(this);
  }

  onMessage(e) {
    if (
      (e && e.nativeEvent && e.nativeEvent.data) ||
      e.nativeEvent.data === "0"
    ) {
      const height = Number(e.nativeEvent.data);
      this.setState({ height });
    } else {
      console.error(`Invalid height received ${e.nativeEvent.data}`); // eslint-disable-line no-console
    }
  }

  onLoadEnd() {
    this.webview.postMessage("thetimes.co.uk", "*");
  }

  handleNavigationStateChange(data) {
    if (
      !data.url.includes("data:text/html") &&
      data.url.includes("http") &&
      !data.url.includes(editorialLambdaOrigin)
    ) {
      // Need to handle native routing when something is clicked.
      InteractiveWrapper.openURLInBrowser(data.url);
      this.webview.reload();
    }
  }

  render() {
    const {
      config: { dev, environment, platform, version },
      id
    } = this.props;
    const { height } = this.state;

    const uri = `${editorialLambdaProtocol}${editorialLambdaOrigin}/${editorialLambdaSlug}/${id}?dev=${dev}&env=${environment}&platform=${platform}&version=${version}`;

    return (
      <View style={{ height }}>
        <WebView
          onLoadEnd={this.onLoadEnd}
          onMessage={this.onMessage}
          onNavigationStateChange={this.handleNavigationStateChange}
          ref={webview => {
            this.webview = webview;
          }}
          scrollEnabled={false}
          source={{ uri }}
          style={{ height }}
          {...InteractiveWrapper.postMessageBugWorkaround()}
        />
      </View>
    );
  }
}

InteractiveWrapper.propTypes = {
  config: PropTypes.shape({}),
  id: PropTypes.string.isRequired
};

InteractiveWrapper.defaultProps = {
  config: {}
};

export default InteractiveWrapper;
