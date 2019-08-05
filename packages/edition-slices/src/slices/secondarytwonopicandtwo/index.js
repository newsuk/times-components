import React, { Component } from "react";
import PropTypes from "prop-types";
import { SecondaryTwoNoPicAndTwoSlice } from "@times-components/slice-layout";
import { TileAE, TileB, TileG, TileAP } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class SecondaryTwoNoPicAndTwo extends Component {
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
      <SecondaryTwoNoPicAndTwoSlice
        breakpoint={breakpoint}
        secondary1={
          <TileB onPress={onPress} tile={secondary1} tileName="secondary1" />
        }
        secondary2={
          <TileB onPress={onPress} tile={secondary2} tileName="secondary2" />
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
      <SecondaryTwoNoPicAndTwoSlice
        breakpoint={breakpoint}
        secondary1={
          <TileAE onPress={onPress} tile={secondary1} tileName="secondary1" />
        }
        secondary2={
          <TileAE onPress={onPress} tile={secondary2} tileName="secondary2" />
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
      <SecondaryTwoNoPicAndTwoSlice
        breakpoint={breakpoint}
        secondary1={
          <TileAE onPress={onPress} tile={secondary1} tileName="secondary1" />
        }
        secondary2={
          <TileAE onPress={onPress} tile={secondary2} tileName="secondary2" />
        }
        support1={
          <TileAP onPress={onPress} tile={support1} tileName="support1" />
        }
        support2={
          <TileAP onPress={onPress} tile={support2} tileName="support2" />
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

SecondaryTwoNoPicAndTwo.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    secondary1: PropTypes.shape({}).isRequired,
    secondary2: PropTypes.shape({}).isRequired,
    support1: PropTypes.shape({}).isRequired,
    support2: PropTypes.shape({}).isRequired
  }).isRequired
};

export default SecondaryTwoNoPicAndTwo;
