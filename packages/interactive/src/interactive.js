import React, { Component } from "react";
import { Linking, Platform, Text, View, WebView } from "react-native";

class Interactive extends Component {
  constructor(){
    super();
    this.state = {
      height: 0,
      loading: true
    }
    this.webview = React.createRef();
    this.onMessage = this.onMessage.bind(this);
    this.handleNavigationStateChange = this.handleNavigationStateChange.bind(this);
  }

  onMessage(message) {
    const height = parseInt(message.nativeEvent.data);
    this.setState({height});
  }

  postMessageBugWorkaround() {
    return Platform.select({
    // https://github.com/facebook/react-native/issues/10865
    ios: {
      injectedJavaScript:
        "window.reactBridgePostMessage = window.postMessage; window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');"
    }
  })}

  openURLInBrowser(url) {
    return Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          return console.error("Cant open url", url); // eslint-disable-line no-console
        }
        return Linking.openURL(url);
      })
      .catch(err => console.error("An error occurred", err)); // eslint-disable-line no-console
  }

  handleNavigationStateChange(data) {
    if(!data.url.includes('data:text/html') && data.url.includes("http") && this.state.loading === false){
      this.webview.stopLoading();
      // Need to handle native routing when something is clicked.
      this.openURLInBrowser(data.url);
    }
  }

  render() {
    return (
      <View style={{height: this.state.height}}>
        <WebView
          style={{height: this.state.height}}
          ref={webview => { this.webview = webview; }}
          onMessage={this.onMessage}
          source={{uri: `https://cwfiyvo20d.execute-api.eu-west-1.amazonaws.com/dev/component/${this.props.id}`}}
          onLoad={() => {
            this.webview.postMessage("thetimes.co.uk", "*")
          }}
          onLoadEnd={() => this.setState({loading: false})}
          onNavigationStateChange={this.handleNavigationStateChange}
          {...this.postMessageBugWorkaround}
        />
     </View>

    )
  }
}

export default Interactive;
