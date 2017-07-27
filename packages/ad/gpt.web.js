import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import AdManager from "./ad-manager";
import Placeholder from "./placeholder";
import { getSlotConfig } from "./generate-config";

const getStyles = config =>
  StyleSheet.create({
    container: {
      height: config.maxSizes.height
    }
  });

class GPT extends Component {
  constructor(props) {
    super(props);
    const { width } = Dimensions.get("window");
    const config = getSlotConfig(
      this.props.adManager.section,
      this.props.code,
      width
    );
    this.state = { config, width };
    this.handleLayout = this.handleLayout.bind(this);
  }

  componentDidMount() {
    this.props.adManager.registerAd(this.state.config);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.width !== nextState.width;
  }

  componentWillUpdate(nextProps, nextState) {
    const adManager = nextProps.adManager;
    adManager
      .unregisterAds([nextProps.code])
      .then(adManager.registerAd.bind(adManager, nextState.config))
      .then(adManager.getAds.bind(adManager));
  }

  componentWillUnmount() {
    this.props.adManager.unregisterAds([this.props.code]);
  }

  handleLayout(event, callback) {
    const { width } = Dimensions.get("window");
    const config = getSlotConfig(
      this.props.adManager.section,
      this.props.code,
      width
    );
    this.setState({ width, config }, callback);
  }

  render() {
    const config = this.state.config;
    const styles = getStyles(config);

    return (
      <View
        style={styles.container}
        id={this.props.code}
        onLayout={this.handleLayout}
      >
        <Placeholder
          width={config.maxSizes.width}
          height={config.maxSizes.height}
        />
      </View>
    );
  }
}

GPT.propTypes = {
  code: PropTypes.string.isRequired,
  adManager: PropTypes.instanceOf(AdManager).isRequired
};

export default GPT;
