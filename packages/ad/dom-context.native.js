import React from "react";
import { WebView, View } from "react-native";

import makeHarness from "./dom-context-harness";
import { propTypes, defaultProps } from "./dom-context-prop-types";

export default class DOMContext extends React.PureComponent {
  handleMessageEvent = e => {
    const message = JSON.parse(e.nativeEvent.data);
    throw new Error(
      `Error in ${message.type} inside WebView: ${message.detail}`
    );
  };

  render() {
    const { init, data, width, height, globalNames, scriptUris } = this.props;
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
        </head>
        <body>
          <div></div>
          <script>
          function handleError(type, detail) {
            // error can intefere with postMessage if not delayed to next frame
            requestAnimationFrame(() => {
              window.postMessage(JSON.stringify({
                type: type,
                detail: detail
              }), "*");
            });
          }
          window.onerror = function(e) {
            handleError("initialisation", e.toString());
          }
          </script>
          <script>
            var harness = (${makeHarness})({
              el: document.getElementsByTagName("div")[0],
              window: window,
              document: document,
              handleError: handleError,
              init: ${init},
              data: ${JSON.stringify(data)},
              scriptUris: ${JSON.stringify(scriptUris)},
              globalNames: ${JSON.stringify(globalNames)}
            });
            harness.execute();
          </script>
        </body>
      </html>
    `;
    // console.log(html);
    return (
      <View style={{ width, height }}>
        <WebView source={{ html }} onMessage={this.handleMessageEvent} />
      </View>
    );
  }
}

DOMContext.propTypes = propTypes;
DOMContext.defaultProps = defaultProps;
