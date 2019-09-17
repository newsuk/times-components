import React, { Component } from "react";
import PropTypes from "prop-types";
import { LeadOneAndOneSlice } from "@times-components/slice-layout";
import { TileA, TileB, TileU, TileAA, TileZ, TileAF } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class LeadOneAndOne extends Component {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
    this.renderWide = this.renderWide.bind(this);
  }

  renderSmall(breakpoint) {
    const {
      onPress,
      slice: { lead, support }
    } = this.props;
    return (
      <LeadOneAndOneSlice
        breakpoint={breakpoint}
        lead={<TileA onPress={onPress} tile={lead} tileName="lead" />}
        support={<TileB onPress={onPress} tile={support} tileName="support" />}
      />
    );
  }

  renderMedium(breakpoint) {
    const {
      onPress,
      slice: { lead, support }
    } = this.props;
    return (
      <LeadOneAndOneSlice
        breakpoint={breakpoint}
        lead={
          <TileU
            breakpoint={breakpoint}
            onPress={onPress}
            tile={lead}
            tileName="lead"
          />
        }
        support={
          <TileAA
            breakpoint={breakpoint}
            onPress={onPress}
            tile={support}
            tileName="support"
          />
        }
      />
    );
  }

  renderWide(breakpoint) {
    const {
      onPress,
      slice: { lead, support }
    } = this.props;
    return (
      <LeadOneAndOneSlice
        breakpoint={breakpoint}
        lead={
          <TileZ
            onPress={onPress}
            tile={lead}
            breakpoint={breakpoint}
            tileName="lead"
          />
        }
        support={
          <TileAF
            onPress={onPress}
            tile={support}
            breakpoint={breakpoint}
            tileName="support"
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

LeadOneAndOne.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    lead: PropTypes.shape({}).isRequired,
    support: PropTypes.shape({}).isRequired
  }).isRequired
};

export default LeadOneAndOne;
