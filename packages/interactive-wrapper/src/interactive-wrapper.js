import React, { Component } from "react";
import { Linking, Platform, Text, View, WebView } from "react-native";
import PropTypes from "prop-types";
class InteractiveWrapper extends Component {
  constructor(){
    super();
    this.state = {
      height: 0,
    }
    this.onMessage = this.onMessage.bind(this);
    this.handleNavigationStateChange = this.handleNavigationStateChange.bind(this);
    this.webview = React.createRef();
  }

  static postMessageBugWorkaround() {
    return Platform.select({
    // https://github.com/facebook/react-native/issues/10865
    ios: {
      injectedJavaScript:
        "window.reactBridgePostMessage = window.postMessage; window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');"
    }
  })}

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

  onMessage(message) {
    const height = parseInt(message.nativeEvent.data);
    this.setState({height});
  }

  handleNavigationStateChange(data) {
    if(!data.url.includes('data:text/html') && data.url.includes("http") && !data.url.includes("cwfiyvo20d.execute-api.eu-west-1.amazonaws.com")){
      // Need to handle native routing when something is clicked.
      InteractiveWrapper.openURLInBrowser(data.url);
      this.webview.stopLoading();
    }
  }

  render() {
    return (
      <View style={{height: this.state.height}}>
        <WebView
          style={{height: this.state.height}}
          ref={this.webview}
          onMessage={this.onMessage}
          source={{uri: `https://cwfiyvo20d.execute-api.eu-west-1.amazonaws.com/dev/component/${this.props.id}`}}
          onLoadEnd={() => {
            this.webview.postMessage("thetimes.co.uk", "*")
          }}
          onNavigationStateChange={this.handleNavigationStateChange}
          {...InteractiveWrapper.postMessageBugWorkaround()}
        />
     </View>

    )
  }
}

InteractiveWrapper.propTypes = {
  id: PropTypes.string.isRequired
};

export default InteractiveWrapper;
