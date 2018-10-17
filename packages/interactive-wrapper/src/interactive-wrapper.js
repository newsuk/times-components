import React, { Component } from "react";
import { Linking, Platform, View, WebView } from "react-native";
import PropTypes from "prop-types";

const editorialLambdaProtocol = "https://";
const editorialLambdaOrigin = "cwfiyvo20d.execute-api.eu-west-1.amazonaws.com";
const editorialLambdaSlug = "dev/component";

class InteractiveWrapper extends Component {
  static postMessageBugWorkaround() {
    return Platform.select({
      // https://github.com/facebook/react-native/issues/10865
      ios: {
        injectedJavaScript:
          "window.reactBridgePostMessage = window.postMessage; window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');"
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
      this.webview.stopLoading();
    }
  }

  render() {
    return (
      <View style={{ height: this.state.height }}>
        <WebView
          onLoadEnd={this.onLoadEnd}
          onMessage={this.onMessage}
          onNavigationStateChange={this.handleNavigationStateChange}
          ref={webview => {
            this.webview = webview;
          }}
          source={{
            uri: `${editorialLambdaProtocol}${editorialLambdaOrigin}/${editorialLambdaSlug}/${
              this.props.id
            }`
          }}
          style={{ height: this.state.height }}
          {...InteractiveWrapper.postMessageBugWorkaround()}
        />
      </View>
    );
  }
}

InteractiveWrapper.propTypes = {
  id: PropTypes.string.isRequired
};

export default InteractiveWrapper;
