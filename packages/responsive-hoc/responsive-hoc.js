import React from 'react';
import { View, Dimensions } from 'react-native';

const Breakpoints = {
  LARGE: Symbol("large"),
  MEDIUM: Symbol("medium"),
  SMALL: Symbol("small")
};

const checkSize = (minWidth, maxWidth) => {
  return (w) => w >= minWidth && (!maxWidth || w < maxWidth);
};

const Sizes = {
  [Breakpoints.SMALL]: checkSize(0, 768),
  [Breakpoints.MEDIUM]: checkSize(768, 1024),
  [Breakpoints.LARGE]: checkSize(1024)
};

const StyleHOC = (WrappedComponent, Styles) => {
  return class extends React.Component {
    static propTypes = WrappedComponent.propTypes;
    static defaultProps = WrappedComponent.defaultProps;

    constructor(props) {
      super(props);

      this.state = {
        width : Dimensions.get('window').width,
        style: { }
      };

      this.handleLayout = this.handleLayout.bind(this);
      this.handleResponsiveStyle = this.handleResponsiveStyle.bind(this);
    }

    render() {
      return (
        <View onLayout={this.handleLayout}>
          <WrappedComponent responsive={this.state.style} {...this.props} />
        </View>
      )
    }

    handleLayout(event) {
      const width = Dimensions.get('window').width;
      const style = this.handleResponsiveStyle(width);

      this.setState({
        width,
        style
      })
    }

    handleResponsiveStyle(width) {
      const breakpointStyles = Object.getOwnPropertySymbols(Sizes)
                        .filter(sz => Sizes[sz](width))
                        .map(sz => Styles.web[sz]);

      return Object.assign({}, Styles.default, ...breakpointStyles);
    }
  }
}

export default StyleHOC;

export { checkSize, Breakpoints, Sizes };
