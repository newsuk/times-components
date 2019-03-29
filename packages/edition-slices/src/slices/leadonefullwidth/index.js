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

  renderMedium() {
    const {
      slice: { lead },
      onPress
    } = this.props;
    return <TileR onPress={onPress} tile={lead} tileName="lead" />;
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

LeadOneFullWidthSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({ lead: PropTypes.shape({}).isRequired }).isRequired
};

export default LeadOneFullWidthSlice;
