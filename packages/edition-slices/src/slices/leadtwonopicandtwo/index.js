import React, { Component } from "react";
import PropTypes from "prop-types";
import { LeadTwoNoPicAndTwoSlice } from "@times-components/slice-layout";
import { TileB, TileD, TileE, TileF, TileX, TileY, TileAL } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class LeadTwoNoPicAndTwo extends Component {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
    this.renderWide = this.renderWide.bind(this);
  }

  renderSmall(breakpoint) {
    const {
      onPress,
      slice: { lead1, lead2, support1, support2 }
    } = this.props;
    return (
      <LeadTwoNoPicAndTwoSlice
        breakpoint={breakpoint}
        lead1={<TileF onPress={onPress} tile={lead1} tileName="lead1" />}
        lead2={<TileB onPress={onPress} tile={lead2} tileName="lead2" />}
        support1={
          <TileD onPress={onPress} tile={support1} tileName="support1" />
        }
        support2={
          <TileE onPress={onPress} tile={support2} tileName="support2" />
        }
      />
    );
  }

  renderMedium(breakpoint) {
    const {
      onPress,
      slice: { lead1, lead2, support1, support2 }
    } = this.props;
    return (
      <LeadTwoNoPicAndTwoSlice
        breakpoint={breakpoint}
        lead1={
          <TileX
            breakpoint={breakpoint}
            onPress={onPress}
            tile={lead1}
            tileName="lead1"
          />
        }
        lead2={
          <TileY
            breakpoint={breakpoint}
            onPress={onPress}
            tile={lead2}
            tileName="lead2"
          />
        }
        support1={
          <TileD
            breakpoint={breakpoint}
            onPress={onPress}
            tile={support1}
            tileName="support1"
          />
        }
        support2={
          <TileE
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
      slice: { lead1, lead2, support1, support2 }
    } = this.props;

    return (
      <LeadTwoNoPicAndTwoSlice
        breakpoint={breakpoint}
        lead1={
          <TileX
            breakpoint={breakpoint}
            onPress={onPress}
            tile={lead1}
            tileName="lead1"
          />
        }
        lead2={
          <TileY
            breakpoint={breakpoint}
            onPress={onPress}
            tile={lead2}
            tileName="lead2"
          />
        }
        support1={
          <TileAL
            breakpoint={breakpoint}
            onPress={onPress}
            tile={support1}
            tileName="support1"
          />
        }
        support2={
          <TileE
            breakpoint={breakpoint}
            onPress={onPress}
            tile={support2}
            tileName="support2"
          />
        }
      />
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderSmall={this.renderSmall}
        renderMedium={this.renderMedium}
        renderWide={this.renderWide}
      />
    );
  }
}

LeadTwoNoPicAndTwo.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    lead1: PropTypes.shape({}).isRequired,
    lead2: PropTypes.shape({}).isRequired,
    support1: PropTypes.shape({}).isRequired,
    support2: PropTypes.shape({}).isRequired
  }).isRequired
};

export default LeadTwoNoPicAndTwo;
