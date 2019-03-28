import React, { Component } from "react";
import { CommentLeadAndCartoon } from "@times-components/slice-layout";
import PropTypes from "prop-types";
import { TileP, TileQ, TileAH, TileAI } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class CommentLeadAndCartoonSlice extends Component {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
  }

  renderSmall(breakpoint) {
    const {
      onPress,
      slice: { lead, cartoon }
    } = this.props;

    return (
      <CommentLeadAndCartoon breakpoint={breakpoint}>
        <TileP onPress={onPress} tile={lead} tileName="lead" />
        <TileQ onPress={onPress} tile={cartoon} tileName="cartoon" />
      </CommentLeadAndCartoon>
    );
  }

  renderMedium(breakpoint) {
    const {
      onPress,
      slice: { lead, cartoon }
    } = this.props;

    return (
      <CommentLeadAndCartoon breakpoint={breakpoint}>
        <TileAH onPress={onPress} tile={lead} tileName="lead" />
        <TileAI onPress={onPress} tile={cartoon} tileName="cartoon" />
      </CommentLeadAndCartoon>
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

CommentLeadAndCartoonSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    cartoon: PropTypes.shape({}).isRequired,
    lead: PropTypes.shape({}).isRequired
  }).isRequired
};

export default CommentLeadAndCartoonSlice;
