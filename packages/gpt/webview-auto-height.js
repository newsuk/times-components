// Note: kindly copied and adapted from https://gist.github.com/epeli/10c77c1710dd137a1335
// the main trick here is that when window.location.hash is changed, handleNavigationChange() function is called

import React from "react";
import { WebView, StyleSheet } from "react-native";

const script = `
<script>
  ;(function() {
  var wrapper = document.createElement("div");
  wrapper.id = "height-wrapper";
  while (document.body.firstChild) {
    wrapper.appendChild(document.body.firstChild);
  }
  document.body.appendChild(wrapper);
  var i = 0;
  function updateHeight() {
    document.title = wrapper.clientHeight;
    window.location.hash = ++i;
  }
  updateHeight();
  window.addEventListener("load", function() {
    updateHeight();
    setTimeout(updateHeight, 1000);
  });
  window.addEventListener("resize", updateHeight);
  }());
</script>
`;

const style = `
<style>
  body, html, #height-wrapper {
    margin: 0;
    padding: 0;
  }
  #height-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
</style>
`;

const codeInject = html => `${style}${html}${script}`;

class WebViewAutoHeight extends React.Component {
  static hasDifferentOrigin(url, baseUrl) {
    return url && url.indexOf(baseUrl) === -1 && url.indexOf("://") > -1;
  }

  constructor(props) {
    super(props);
    this.state = {
      realContentHeight: this.props.minHeight
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleNavigationChange = this.handleNavigationChange.bind(this);
  }

  handleTitleChange(title) {
    if (title) {
      const realContentHeight = parseInt(title, 10) || 0; // turn NaN to 0
      if (
        realContentHeight > 0 &&
        this.state.realContentHeight !== realContentHeight
      ) {
        this.setState({ realContentHeight });
      }
    }
  }

  handleOriginChange(url) {
    if (WebViewAutoHeight.hasDifferentOrigin(url, this.props.baseUrl)) {
      this.webview.stopLoading();
      if (typeof this.props.onOriginChange === "function") {
        this.props.onOriginChange(url);
      }
    }
  }

  handleNavigationChange(navState) {
    this.handleTitleChange(navState.title);
    this.handleOriginChange(navState.url);

    if (typeof this.props.onNavigationStateChange === "function") {
      this.props.onNavigationStateChange(navState);
    }
  }

  render() {
    const { source, minHeight, baseUrl } = this.props;
    const html = source.html;

    if (!html) {
      throw new Error("WebViewAutoHeight supports only source");
    }

    return (
      <WebView
        ref={ref => {
          this.webview = ref;
        }}
        source={{ html: codeInject(html), baseUrl }}
        scrollEnabled={false}
        style={[
          this.props.style,
          { height: Math.max(this.state.realContentHeight, minHeight) }
        ]}
        javaScriptEnabled
        onNavigationStateChange={this.handleNavigationChange}
      />
    );
  }
}

WebViewAutoHeight.defaultProps = {
  minHeight: 0,
  baseUrl: "",
  style: null,
  onNavigationStateChange: null,
  onOriginChange: null
};

WebViewAutoHeight.propTypes = {
  source: React.PropTypes.shape({
    html: React.PropTypes.string
  }).isRequired,
  minHeight: React.PropTypes.number,
  onNavigationStateChange: React.PropTypes.func,
  onOriginChange: React.PropTypes.func,
  baseUrl: React.PropTypes.string,
  style: React.PropTypes.instanceOf(StyleSheet)
};

export default WebViewAutoHeight;
