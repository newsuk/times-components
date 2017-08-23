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
    this.handleLayout = this.handleLayout.bind(this);
    const { width } = Dimensions.get("window");
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

  handleLayout(event) {
    const width = event.nativeEvent.layout.width;
    if (this.state.width !== width) {
      const config = getSlotConfig(
        this.props.adManager.section,
        this.props.code,
        width
      );
      this.setState({ config });
    }
  }

  render() {
    const { config } = this.state;
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
