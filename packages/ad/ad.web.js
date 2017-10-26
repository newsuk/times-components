import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import StylePropTypes from "react-style-proptype";
import { Subscriber } from "react-broadcast";
import AdComposer from "./ad-composer";
import GPT from "./gpt";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  }
});

class Ad extends Component {
  renderGpt(adManager) {
    return (
      <GPT
        adManager={adManager}
        code={this.props.code}
        style={[this.props.style, styles.container]}
      />
    );
  }

  render() {
    return (
      <Subscriber channel="adChannel">
        {adManager => this.renderGpt(adManager)}
      </Subscriber>
    );
  }
}

Ad.propTypes = {
  code: PropTypes.string.isRequired,
  style: StylePropTypes
};

Ad.defaultProps = {
  style: null
};

export default Ad;

export { AdComposer };
