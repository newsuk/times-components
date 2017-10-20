import React, { Component } from "react";
import { ViewPropTypes, Dimensions, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import AdManager from "./ad-manager";
import Placeholder from "./placeholder";
import { getSlotConfig } from "./generate-config";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const getStyles = config =>
  StyleSheet.create({
    container: {
      minHeight: config.maxSizes.height
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
    const { nativeEvent: { layout: { width } } } = event;
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
        style={[styles.container, this.props.style]}
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
  style: ViewPropTypesStyle,
  adManager: PropTypes.instanceOf(AdManager).isRequired
};
GPT.defaultProps = {
  style: null
};

export default GPT;
