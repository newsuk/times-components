import React, { Component } from "react";
import PropTypes from "prop-types";
import { TileA, TileR } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class LeadOneFullWidthSlice extends Component {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
  }

  renderSmall() {
    const {
      slice: { lead },
      onPress
    } = this.props;
    return <TileA onPress={onPress} tile={lead} tileName="lead" />;
  }

  renderMedium(breakpoint) {
    const {
      slice: { lead },
      onPress
    } = this.props;
    return (
      <TileR
        breakpoint={breakpoint}
        onPress={onPress}
        tile={lead}
        tileName="lead"
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

LeadOneFullWidthSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({ lead: PropTypes.shape({}).isRequired }).isRequired
};

export default LeadOneFullWidthSlice;
