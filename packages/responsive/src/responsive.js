import React from "react";
import PropTypes from "prop-types";
import { getEditionBreakpoint } from "@times-components/ts-styleguide";
import { getDimensions } from "@times-components/utils";
import ResponsiveContext from "./context";

const Responsive = ({ children }) => {
  const { width } = getDimensions();

  return (
    <ResponsiveContext.Provider
      value={{
        editionBreakpoint: getEditionBreakpoint(width),
        isTablet: false,
        screenWidth: width
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
};

Responsive.propTypes = {
  children: PropTypes.node
};

Responsive.defaultProps = {
  children: null
};

export default Responsive;
export { ResponsiveContext };
