import React, { Component } from "react";
import PropTypes from "prop-types";
import { SecondaryTwoAndTwoSlice } from "@times-components/slice-layout";
import { TileC, TileG, TileV, TileAM, TileAN } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class SecondaryTwoAndTwo extends Component {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
    this.renderWide = this.renderWide.bind(this);
  }

  renderSmall(breakpoint) {
    const {
      onPress,
      slice: { secondary1, secondary2, support1, support2 }
    } = this.props;

    return (
      <SecondaryTwoAndTwoSlice
        breakpoint={breakpoint}
        secondary1={
          <TileC onPress={onPress} tile={secondary1} tileName="secondary1" />
        }
        secondary2={
          <TileC onPress={onPress} tile={secondary2} tileName="secondary2" />
        }
        support1={
          <TileG onPress={onPress} tile={support1} tileName="support1" />
        }
        support2={
          <TileG onPress={onPress} tile={support2} tileName="support2" />
        }
      />
    );
  }

  renderMedium(breakpoint) {
    const {
      onPress,
      slice: { secondary1, secondary2, support1, support2 }
    } = this.props;

    return (
      <SecondaryTwoAndTwoSlice
        breakpoint={breakpoint}
        secondary1={
          <TileV onPress={onPress} tile={secondary1} tileName="secondary1" />
        }
        secondary2={
          <TileV onPress={onPress} tile={secondary2} tileName="secondary2" />
        }
        support1={
          <TileG
            breakpoint={breakpoint}
            onPress={onPress}
            tile={support1}
            tileName="support1"
          />
        }
        support2={
          <TileG
            breakpoint={breakpoint}
            onPress={onPress}
            tile={support2}
            tileName="support2"
          />
        }
      />
    );
  }

  renderWide(breakpoint) {
    const {
      onPress,
      slice: { secondary1, secondary2, support1, support2 }
    } = this.props;

    return (
      <SecondaryTwoAndTwoSlice
        breakpoint={breakpoint}
        secondary1={
          <TileAM onPress={onPress} tile={secondary1} tileName="secondary1" />
        }
        secondary2={
          <TileAM onPress={onPress} tile={secondary2} tileName="secondary2" />
        }
        support1={
          <TileAN onPress={onPress} tile={support1} tileName="support1" />
        }
        support2={
          <TileAN onPress={onPress} tile={support2} tileName="support2" />
        }
      />
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderHuge={this.renderWide}
        renderMedium={this.renderMedium}
        renderSmall={this.renderSmall}
        renderWide={this.renderWide}
      />
    );
  }
}

SecondaryTwoAndTwo.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    secondary1: PropTypes.shape({}).isRequired,
    secondary2: PropTypes.shape({}).isRequired,
    support1: PropTypes.shape({}).isRequired,
    support2: PropTypes.shape({}).isRequired
  }).isRequired
};

export default SecondaryTwoAndTwo;
