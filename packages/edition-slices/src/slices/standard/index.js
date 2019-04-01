import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Column } from "@times-components/slice-layout";
import { TileK } from "../../tiles";
import { ResponsiveSlice } from "../shared";
import styles from "./styles";

class Standard extends Component {
  constructor() {
    super();

    this.renderMedium = this.renderMedium.bind(this);
    this.renderSmall = this.renderSmall.bind(this);
  }

  getTiles() {
    const {
      slice: { items },
      onPress
    } = this.props;

    return items.map(tile => () => <TileK onPress={onPress} tile={tile} />);
  }

  renderMedium() {
    return (
      <View style={styles.container}>
        <Column tiles={this.getTiles()} />
      </View>
    );
  }

  renderSmall() {
    return <Column tiles={this.getTiles()} />;
  }

  render() {
    return (
      <ResponsiveSlice
        renderMedium={this.renderMedium}
        renderSmall={this.renderSmall}
      />
    );
  }
}

Standard.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    items: PropTypes.array.isRequired
  }).isRequired
};

export default Standard;
