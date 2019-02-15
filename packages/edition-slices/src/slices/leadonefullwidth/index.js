import React from "react";
import PropTypes from "prop-types";
import { ResponsiveContext } from "@times-components/responsive";
import { editionBreakpoints } from "@times-components/styleguide";
import { TileA, TileR } from "../../tiles";

const LeadOneFullWidthSlice = ({ slice: { lead }, onPress }) => (
  <ResponsiveContext.Consumer>
    {({ editionBreakpoint }) =>
      editionBreakpoint === editionBreakpoints.small ? (
        <TileA onPress={onPress} tile={lead} />
      ) : (
        <TileR onPress={onPress} tile={lead} />
      )
    }
  </ResponsiveContext.Consumer>
);

LeadOneFullWidthSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({ lead: PropTypes.shape({}).isRequired }).isRequired
};

export default LeadOneFullWidthSlice;
