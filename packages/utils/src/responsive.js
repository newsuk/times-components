import React, { Component } from "react";
import { Dimensions } from "react-native";
import { ResponsiveContext } from "@times-components/context";
import PropTypes from "prop-types";

class Responsive extends Component {
  constructor() {
    super();
    this.onDimensionChange = this.onDimensionChange.bind(this);
    const { width } = Dimensions.get("window");
    this.state = { isTablet: width > 660, screenWidth: width };
  }

  componentWillMount() {
    Dimensions.addEventListener("change", this.onDimensionChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onDimensionChange);
  }

  onDimensionChange({ window: { width } }) {
    // TODO: Reuse the same function as constructor for isTablet conditions
    this.setState({ isTablet: width > 660, screenWidth: width });
  }

  render() {
    const { children } = this.props;
    const { isTablet, screenWidth } = this.state;
    console.log("Render Responsive screenWidth:", screenWidth, isTablet);

    return (
      <ResponsiveContext.Provider value={this.state}>
        {children}
      </ResponsiveContext.Provider>
    );
  }
}

Responsive.propTypes = {
  children: PropTypes.node.isRequired
};

export default Responsive;
