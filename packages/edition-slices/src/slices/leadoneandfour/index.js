import React, { Component } from "react";
import PropTypes from "prop-types";
import { LeadOneAndFourSlice } from "@times-components/slice-layout";
import { TileAC, TileAD, TileI, TileJ } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class LeadOneAndFour extends Component {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
  }

  renderSmall(breakpoint) {
    const {
      onPress,
      slice: { lead, support1, support2, support3, support4 }
    } = this.props;

    return (
      <LeadOneAndFourSlice
        breakpoint={breakpoint}
        lead={<TileI onPress={onPress} tile={lead} tileName="lead" />}
        support1={
          <TileJ onPress={onPress} tile={support1} tileName="support1" />
        }
        support2={
          <TileJ onPress={onPress} tile={support2} tileName="support2" />
        }
        support3={
          <TileJ onPress={onPress} tile={support3} tileName="support3" />
        }
        support4={
          <TileJ onPress={onPress} tile={support4} tileName="support4" />
        }
      />
    );
  }

  renderMedium(breakpoint) {
    const {
      onPress,
      slice: { lead, support1, support2, support3, support4 }
    } = this.props;

    return (
      <LeadOneAndFourSlice
        breakpoint={breakpoint}
        lead={
          <TileAC
            onPress={onPress}
            tile={lead}
            tileName="lead"
            breakpoint={breakpoint}
          />
        }
        support1={
          <TileAD onPress={onPress} tile={support1} tileName="support1" />
        }
        support2={
          <TileAD onPress={onPress} tile={support2} tileName="support2" />
        }
        support3={
          <TileAD onPress={onPress} tile={support3} tileName="support3" />
        }
        support4={
          <TileAD onPress={onPress} tile={support4} tileName="support4" />
        }
      />
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderSmall={this.renderSmall}
        renderMedium={this.renderMedium}
      />
    );
  }
}

LeadOneAndFour.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    lead: PropTypes.shape({}).isRequired,
    support1: PropTypes.shape({}).isRequired,
    support2: PropTypes.shape({}).isRequired,
    support3: PropTypes.shape({}).isRequired,
    support4: PropTypes.shape({}).isRequired
  }).isRequired
};

export default LeadOneAndFour;
