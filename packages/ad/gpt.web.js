import React, { Component } from "react";
import { Dimensions, StyleSheet, View, Image, Text } from "react-native";
import PropTypes from "prop-types";

import AdManager from "./ad-manager";
import Placeholder from "./placeholder";
import { getSlotConfig } from "./generate-config";

const getStyles = config =>
  StyleSheet.create({
    container: {
      height: config.maxHeight
    }
  });

class GPT extends Component {
  constructor(props) {
    super(props);
    this.handleLayout = this.handleLayout.bind(this);
    const { width } = Dimensions.get("window");
    console.log(width)
    const config = getSlotConfig(
      this.props.adManager.section,
      this.props.code,
      width
    );
    this.state = {
      config
    };
  }

  componentDidMount() {
    this.props.adManager.registerAd(this.state.config);
  }

  componentWillUpdate() {
    this.props.adManager.unregisterAd(this.props.code);
    this.props.adManager.registerAd(this.state.config);
  }

  componentWillUnmount() {
    this.props.adManager.unregisterAd(this.props.code);
  }

  handleLayout(event, callback) {
    const width = event.nativeEvent.layout.width;
    if (this.state.width !== width) {
      const config = getSlotConfig(
        this.props.adManager.section,
        this.props.code,
        width
      );
      this.setState({ config }, callback);
    }
  }

  render() {
    const styles = getStyles(this.state.config);

    return (
      <View
        style={styles.container}
        id={this.props.code}
        onLayout={this.handleLayout}
        style={styles.container} >
        <Placeholder config={this.state.config} />
      </View>
    );
  }
}

GPT.propTypes = {
  code: PropTypes.string.isRequired,
  adManager: PropTypes.instanceOf(AdManager).isRequired
};

export default GPT;
