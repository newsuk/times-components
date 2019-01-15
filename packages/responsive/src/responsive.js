import React, { Component } from "react";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";
import { tabletWidth } from "@times-components/styleguide";
import ResponsiveContext from "./context";

const calculateState = width => ({
  isTablet: width > tabletWidth,
  screenWidth: width
});

class Responsive extends Component {
  constructor() {
    super();
    this.onDimensionChange = this.onDimensionChange.bind(this);
    const { width } = Dimensions.get("window");
    this.state = calculateState(width);
  }

  componentWillMount() {
    Dimensions.addEventListener("change", this.onDimensionChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onDimensionChange);
  }

  onDimensionChange({ window: { width } }) {
    this.setState(calculateState(width));
  }

  render() {
    const { children } = this.props;

    return (
      <ResponsiveContext.Provider value={this.state}>
        {children}
      </ResponsiveContext.Provider>
    );
  }
}

Responsive.propTypes = {
  children: PropTypes.node
};

Responsive.defaultProps = {
  children: null
};

export default Responsive;
export { ResponsiveContext };
