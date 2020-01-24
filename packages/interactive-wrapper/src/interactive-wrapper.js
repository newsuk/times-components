import React, { Component } from "react";
import { Linking, View } from "react-native";
import { WebView } from "react-native-webview";
import PropTypes from "prop-types";
import webviewEventCallbackSetup from "./webview-event-callback-setup";
import ResponsiveImageInteractive from "./responsive-image";

const editorialLambdaProtocol = "https://";
const editorialLambdaOrigin = "jotn9sgpg6.execute-api.eu-west-1.amazonaws.com";
const editorialLambdaSlug = "prod/component";

class InteractiveWrapper extends Component {
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
      height: 1,
      retries: 3
    };
    this.onMessage = this.onMessage.bind(this);
    this.handleNavigationStateChange = this.handleNavigationStateChange.bind(
      this
    );
    this.onLoadEnd = this.onLoadEnd.bind(this);
    this.onError = this.onError.bind(this);
  }

  onMessage(e) {
    if (
      (e && e.nativeEvent && e.nativeEvent.data) ||
      e.nativeEvent.data === "0"
    ) {
      const height = parseInt(e.nativeEvent.data, 10);
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(height)) {
        this.setState({ height });
      } else {
        this.onError();
      }
    } else {
      console.error(`Invalid height received ${e.nativeEvent.data}`); // eslint-disable-line no-console
    }
  }

  onLoadEnd() {
    this.webview.postMessage("thetimes.co.uk", "*");
  }

  onError() {
    const { retries } = this.state;
    if (retries) {
      this.setState({ retries: retries - 1 });
      setTimeout(() => {
        this.webview.reload();
      }, 1000);
    }
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
          onError={this.onError}
          injectedJavaScript={`window.postMessage = function(data) {window.ReactNativeWebView.postMessage(data);};(${webviewEventCallbackSetup})({window});`}
          onLoadEnd={this.onLoadEnd}
          onMessage={this.onMessage}
          onNavigationStateChange={this.handleNavigationStateChange}
          ref={webview => {
            this.webview = webview;
          }}
          scrollEnabled={false}
          source={{ uri }}
          style={{ height }}
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

InteractiveWrapper.ResponsiveImageInteractive = ResponsiveImageInteractive;

export default InteractiveWrapper;
