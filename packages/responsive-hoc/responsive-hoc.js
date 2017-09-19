import React from "react";
import { View, Dimensions } from "react-native";

const Breakpoints = {
  LARGE: Symbol("large"),
  MEDIUM: Symbol("medium"),
  SMALL: Symbol("small")
};

const checkSize = (minWidth, maxWidth) => {
  return w => w >= minWidth && (!maxWidth || w < maxWidth);
};

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

const StyleHOC = (WrappedComponent, Styles) => {
  return class extends React.Component {
    static propTypes = WrappedComponent.propTypes;
    static defaultProps = WrappedComponent.defaultProps;

    constructor(props) {
      super(props);

      this.state = {
        width: Dimensions.get("window").width,
        style: {}
      };

      this.handleLayout = this.handleLayout.bind(this);
      this.handleResponsiveStyle = this.handleResponsiveStyle.bind(this);
    }

    render() {
      return (
        <View onLayout={this.handleLayout}>
          <WrappedComponent responsive={this.state.style} {...this.props} />
        </View>
      );
    }

    handleLayout() {
      const width = Dimensions.get("window").width;
      const style = this.handleResponsiveStyle(width);

      this.setState({
        width,
        style
      });
    }

    handleResponsiveStyle(width) {
      const breakpointStyles = Object.getOwnPropertySymbols(SizeBoundaries)
        .filter(sz => SizeBoundaries[sz](width))
        .map(sz => resolveSize(sz, Styles.web));

      return Object.assign({}, Styles.default, ...breakpointStyles);
    }
  };
};

export default StyleHOC;

export { checkSize, Breakpoints, SizeBoundaries };
