import React from "react";
import { View, Dimensions, Platform } from "react-native";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";

const Breakpoints = {
  LARGE: Symbol("large"),
  MEDIUM: Symbol("medium"),
  SMALL: Symbol("small")
};

const checkSize = (minWidth, maxWidth) => w =>
  w >= minWidth && (!maxWidth || w < maxWidth);

const Sizes = {
  [Breakpoints.SMALL]: 0,
  [Breakpoints.MEDIUM]: 768,
  [Breakpoints.LARGE]: 1024
};

const SizeBoundaries = {
  [Breakpoints.SMALL]: checkSize(
    Sizes[Breakpoints.SMALL],
    Sizes[Breakpoints.MEDIUM]
  ),
  [Breakpoints.MEDIUM]: checkSize(
    Sizes[Breakpoints.MEDIUM],
    Sizes[Breakpoints.LARGE]
  ),
  [Breakpoints.LARGE]: checkSize(Sizes[Breakpoints.LARGE])
};

const resolveSize = (size, styles) => {
  if (styles[size]) {
    return styles[size];
  }

  const currentSize = Sizes[size];
  const closestSize = Object.getOwnPropertySymbols(Sizes)
    .reverse()
    .find(bp => Sizes[bp] <= currentSize && styles[bp]);

  return closestSize ? styles[closestSize] : null;
};

export default (WrappedComponent, Styles) => {
  const componentName = getDisplayName(WrappedComponent);

  class WithResponsiveStyles extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        width: Dimensions.get("window").width,
        style: {}
      };

      this.handleLayout = this.handleLayout.bind(this);
      this.handleResponsiveStyle = this.handleResponsiveStyle.bind(this);
    }

    handleLayout() {
      const width = Dimensions.get("window").width;
      const style = this.handleResponsiveStyle(width);

      this.setState({
        width,
        style
      });
    }

    // eslint-disable-next-line class-methods-use-this
    handleResponsiveStyle(width) {
      const breakpointStyles = Object.getOwnPropertySymbols(SizeBoundaries)
        .filter(sz => SizeBoundaries[sz](width))
        .map(sz => resolveSize(sz, Styles.web));

      return Object.assign({}, Styles.default, ...breakpointStyles);
    }

    render() {
      const { style, ...props } = this.props;

      if (Platform.OS !== "web") {
        return <WrappedComponent {...this.props} />;
      }

      const newStyle = Object.assign({}, style, this.state.style);

      return (
        <View onLayout={this.handleLayout}>
          <WrappedComponent style={newStyle} {...props} />
        </View>
      );
    }
  }

  WithResponsiveStyles.displayName = `WithResponsiveStyles(${componentName})`;
  WithResponsiveStyles.propTypes = WrappedComponent.propTypes;
  WithResponsiveStyles.defaultProps = WrappedComponent.defaultProps;
  hoistNonReactStatic(WithResponsiveStyles, WrappedComponent);

  return WithResponsiveStyles;
};

export { checkSize, Breakpoints, SizeBoundaries };
