// Note: kindly copied and adapted from https://gist.github.com/epeli/10c77c1710dd137a1335
// the main trick here is that when window.location.hash is changed, handleNavigationChange() function is called

import React from "react";
import { WebView } from "react-native";

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
  constructor(props) {
    super(props);
    this.state = {
      realContentHeight: this.props.minHeight
    };

    this.handleNavigationChange = this.handleNavigationChange.bind(this);
  }

  handleNavigationChange(navState) {
    if (navState.title) {
      const realContentHeight = parseInt(navState.title, 10) || 0; // turn NaN to 0
      if (realContentHeight > 0) {
        this.setState({ realContentHeight });
      }
    }
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
  onNavigationStateChange: null
};

WebViewAutoHeight.propTypes = {
  source: React.PropTypes.objectOf({
    html: React.PropTypes.string.isRequired
  }).isRequired,
  minHeight: React.PropTypes.number,
  onNavigationStateChange: React.PropTypes.func,
  baseUrl: React.PropTypes.string,
  style: WebView.propTypes.style
};

export default WebViewAutoHeight;
