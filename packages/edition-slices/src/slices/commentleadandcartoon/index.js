import React from "react";
import { CommentLeadAndCartoon } from "@times-components/slice-layout";
import PropTypes from "prop-types";
import { TileP, TileQ, TileAH, TileAI } from "../../tiles";
import { ResponsiveSlice } from "../shared";

const CommentLeadAndCartoonSlice = ({ onPress, slice: { lead, cartoon } }) => (
  <ResponsiveSlice
    renderMedium={editionBreakpoint => (
      <CommentLeadAndCartoon
        breakpoint={editionBreakpoint}
        renderCartoon={() => (
          <TileAI onPress={onPress} tile={cartoon} tileName="cartoon" />
        )}
        renderLead={() => (
          <TileAH onPress={onPress} tile={lead} tileName="lead" />
        )}
      />
    )}
    renderSmall={editionBreakpoint => (
      <CommentLeadAndCartoon
        breakpoint={editionBreakpoint}
        renderCartoon={() => (
          <TileQ onPress={onPress} tile={cartoon} tileName="cartoon" />
        )}
        renderLead={() => (
          <TileP onPress={onPress} tile={lead} tileName="lead" />
        )}
      />
    )}
  />
);

CommentLeadAndCartoonSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    cartoon: PropTypes.shape({}).isRequired,
    lead: PropTypes.shape({}).isRequired
  }).isRequired
};

export default CommentLeadAndCartoonSlice;
