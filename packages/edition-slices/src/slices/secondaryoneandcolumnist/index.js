import React, { Component } from "react";
import PropTypes from "prop-types";
import { SecondaryOneAndColumnistSlice } from "@times-components/slice-layout";
import { TileH, TileT, TileAA, TileAB } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class SecondaryOneAndColumnist extends Component {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
  }

  renderSmall(breakpoint) {
    const {
      onPress,
      slice: { columnist, secondary }
    } = this.props;
    return (
      <SecondaryOneAndColumnistSlice breakpoint={breakpoint}>
        <TileT onPress={onPress} tile={secondary} tileName="secondary" />
        <TileH onPress={onPress} tile={columnist} tileName="columnist" />
      </SecondaryOneAndColumnistSlice>
    );
  }

  renderMedium(breakpoint) {
    const {
      onPress,
      slice: { columnist, secondary }
    } = this.props;
    return (
      <SecondaryOneAndColumnistSlice breakpoint={breakpoint}>
        <TileAA onPress={onPress} tile={secondary} tileName="secondary" />
        <TileAB onPress={onPress} tile={columnist} tileName="columnist" />
      </SecondaryOneAndColumnistSlice>
    );
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

SecondaryOneAndColumnist.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    columnist: PropTypes.shape({}).isRequired,
    secondary: PropTypes.shape({}).isRequired
  }).isRequired
};

export default SecondaryOneAndColumnist;
