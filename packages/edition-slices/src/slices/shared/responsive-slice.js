import React from "react";
import PropTypes from "prop-types";
import { ResponsiveContext } from "@times-components/responsive";
import { editionBreakpoints } from "@times-components/styleguide";
import Gutter from "./gutter";

const ResponsiveSlice = ({ renderSmall, renderMedium }) => (
  <ResponsiveContext.Consumer>
    {({ editionBreakpoint }) =>
      editionBreakpoint === editionBreakpoints.small ? (
        renderSmall(editionBreakpoint)
      ) : (
        <Gutter>{renderMedium(editionBreakpoint)}</Gutter>
      )
    }
  </ResponsiveContext.Consumer>
);

ResponsiveSlice.propTypes = {
  renderMedium: PropTypes.func.isRequired,
  renderSmall: PropTypes.func.isRequired
};

export default ResponsiveSlice;
