import React, { Component } from "react";
import { Linking } from "react-native";
import PropTypes from "prop-types";
import AutoHeightWebView from "react-native-autoheight-webview";
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
      height: 1
    };
    this.handleOnShouldStartLoadWithRequest = this.handleOnShouldStartLoadWithRequest.bind(
      this
    );
    this.onLoadEnd = this.onLoadEnd.bind(this);
  }

  onLoadEnd() {
    if (this.webview) {
      this.webview.postMessage("thetimes.co.uk", "*");
    }
  }

  updateHeight = passedHeight => {
    const { height } = this.state;
    if (passedHeight !== height) {
      this.setState({ height: passedHeight });
    }
  };

  // eslint-disable-next-line class-methods-use-this
  handleOnShouldStartLoadWithRequest(data) {
    if (
      !data.url.includes("data:text/html") &&
      data.url.includes("http") &&
      !data.url.includes(editorialLambdaOrigin)
    ) {
      InteractiveWrapper.openURLInBrowser(data.url);
      return false;
    }
    return true;
  }

  render() {
    const {
      config: { dev, environment, platform, version },
      id
    } = this.props;
    const { height } = this.state;
    const uri = `${editorialLambdaProtocol}${editorialLambdaOrigin}/${editorialLambdaSlug}/${id}?dev=${dev}&env=${environment}&platform=${platform}&version=${version}`;
    const scriptToInject = `
      setTimeout(function() {
        window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight);
      }, 500);
      true;
    `;
    return (
      <AutoHeightWebView
        onSizeUpdated={size => this.updateHeight(size.height)}
        scalesPageToFit
        automaticallyAdjustContentInsets={false}
        injectedJavaScript={scriptToInject}
        onLoadEnd={this.onLoadEnd}
        ref={ref => {
          this.webview = ref;
        }}
        scrollEnabled={false}
        onShouldStartLoadWithRequest={this.handleOnShouldStartLoadWithRequest}
        source={{ uri }}
        style={{ height, width: "100%" }}
      />
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
