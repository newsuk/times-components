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

  renderSmall(editionBreakpoint) {
    const {
      onPress,
      slice: { lead, cartoon }
    } = this.props;

    return (
      <CommentLeadAndCartoon
        breakpoint={editionBreakpoint}
        cartoon={<TileQ onPress={onPress} tile={cartoon} tileName="cartoon" />}
        lead={<TileP onPress={onPress} tile={lead} tileName="lead" />}
      />
    );
  }

  renderMedium(editionBreakpoint) {
    const {
      onPress,
      slice: { lead, cartoon }
    } = this.props;

    return (
      <CommentLeadAndCartoon
        breakpoint={editionBreakpoint}
        cartoon={<TileAI onPress={onPress} tile={cartoon} tileName="cartoon" />}
        lead={
          <TileAH
            onPress={onPress}
            tile={lead}
            tileName="lead"
            breakpoint={editionBreakpoint}
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

CommentLeadAndCartoonSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    cartoon: PropTypes.shape({}).isRequired,
    lead: PropTypes.shape({}).isRequired
  }).isRequired
};

export default CommentLeadAndCartoonSlice;
