import React from "react";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";
import ResponsiveContext from "./context";

const Responsive = ({ children }) => {
  const { width } = Dimensions.get("window");

  return (
    <ResponsiveContext.Provider value={{ isTablet: false, screenWidth: width }}>
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
