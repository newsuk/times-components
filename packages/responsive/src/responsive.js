import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  getEditionBreakpoint,
  tabletWidth
} from "@times-components/styleguide";
import {
  getDimensions,
  addDimensionsListener,
  removeDimensionsListener
} from "@times-components/utils";
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
    const { fontScale, width } = getDimensions();
    this.state = calculateState(width, fontScale);
  }

  componentDidMount() {
    addDimensionsListener("change", this.onDimensionChange);
  }

  componentWillUnmount() {
    removeDimensionsListener("change", this.onDimensionChange);
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
