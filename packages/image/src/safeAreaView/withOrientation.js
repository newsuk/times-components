// copied from https://raw.githubusercontent.com/react-native-community/react-native-safe-area-view/legacy/withOrientation.js
import React, { Component } from "react";
import { Dimensions } from "react-native";
import hoistNonReactStatic from "hoist-non-react-statics";

export const isOrientationLandscape = ({ width, height }) => width > height;

export default function(WrappedComponent) {
  class withOrientation extends Component {
    constructor() {
      super();

      const isLandscape = isOrientationLandscape(Dimensions.get("window"));
      this.state = { isLandscape };
    }

    componentDidMount() {
      if (typeof Dimensions.addEventListener === "function") {
        Dimensions.addEventListener("change", this.handleOrientationChange);
      }
    }

    componentWillUnmount() {
      if (typeof Dimensions.removeEventListener === "function") {
        Dimensions.removeEventListener("change", this.handleOrientationChange);
      }
    }

    handleOrientationChange = ({ window }) => {
      const isLandscape = isOrientationLandscape(window);
      this.setState({ isLandscape });
    };

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  return hoistNonReactStatic(withOrientation, WrappedComponent);
}
