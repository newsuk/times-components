import React, { Component } from "react";
import PropTypes from "prop-types";
import { SecondaryOneAndColumnistSlice } from "@times-components/slice-layout";
import { TileH, TileT, TileAB, TileB } from "../../tiles";
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
      <SecondaryOneAndColumnistSlice
        breakpoint={breakpoint}
        columnist={
          <TileH onPress={onPress} tile={columnist} tileName="columnist" />
        }
        secondary={
          <TileT onPress={onPress} tile={secondary} tileName="secondary" />
        }
      />
    );
  }

  renderMedium(breakpoint) {
    const {
      onPress,
      slice: { columnist, secondary }
    } = this.props;
    return (
      <SecondaryOneAndColumnistSlice
        breakpoint={breakpoint}
        columnist={
          <TileAB
            breakpoint={breakpoint}
            onPress={onPress}
            tile={columnist}
            tileName="columnist"
          />
        }
        secondary={
          <TileB
            breakpoint={breakpoint}
            onPress={onPress}
            tile={secondary}
            tileName="secondary"
          />
        }
      />
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
