import React, { Component } from "react";
import PropTypes from "prop-types";
import { LeadTwoNoPicAndTwoSlice } from "@times-components/slice-layout";
import { TileB, TileD, TileE, TileF, TileX, TileY, TileZ } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class LeadTwoNoPicAndTwo extends Component {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
  }

  renderSmall(breakpoint) {
    const {
      onPress,
      slice: { lead1, lead2, support1, support2 }
    } = this.props;
    return (
      <LeadTwoNoPicAndTwoSlice breakpoint={breakpoint}>
        <TileF onPress={onPress} tile={lead1} tileName="lead1" />
        <TileB onPress={onPress} tile={lead2} tileName="lead2" />
        <TileD onPress={onPress} tile={support1} tileName="support1" />
        <TileE onPress={onPress} tile={support2} tileName="support2" />
      </LeadTwoNoPicAndTwoSlice>
    );
  }

  renderMedium(breakpoint) {
    const {
      onPress,
      slice: { lead1, lead2, support1, support2 }
    } = this.props;
    return (
      <LeadTwoNoPicAndTwoSlice breakpoint={breakpoint}>
        <TileX onPress={onPress} tile={lead1} tileName="lead1" />
        <TileY onPress={onPress} tile={lead2} tileName="lead2" />
        <TileD onPress={onPress} tile={support1} tileName="support1" />
        <TileZ onPress={onPress} tile={support2} tileName="support2" />
      </LeadTwoNoPicAndTwoSlice>
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
