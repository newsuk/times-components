import React, { Component } from "react";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";
import {
  getEditionBreakpoint,
  tabletWidth
} from "@times-components/styleguide";
import ResponsiveContext from "./context";

const calculateState = (width, fontScale) => ({
  editionBreakpoint: getEditionBreakpoint(width),
  fontScale,
  isTablet: width > tabletWidth,
  screenWidth: width
});

class Responsive extends Component {
  constructor(props) {
    super(props);
    this.onDimensionChange = this.onDimensionChange.bind(this);
    const { fontScale, width } = Dimensions.get("window");
    this.state = calculateState(width, fontScale);
  }

  componentDidMount() {
    Dimensions.addEventListener("change", this.onDimensionChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onDimensionChange);
  }

  onDimensionChange({ window: { fontScale, width } }) {
    this.setState(calculateState(width, fontScale));
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
