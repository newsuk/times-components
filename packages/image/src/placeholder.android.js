import React, { Component } from "react";
import Placeholder from "./placeholder.base";

class PlaceholderAndroidWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { renderChildren: true };
  }

  /**
   * Deal with a bug in react-native-art that leads to the placeholder being
   * rendered with stale dimensions. This forces a re-render
   */
  componentDidUpdate({ dimensions: prevDimensions }) {
    const { dimensions } = this.props;
    const { renderChildren } = this.state;

    if (renderChildren && prevDimensions && dimensions !== prevDimensions) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ renderChildren: false }, () =>
        this.setState({ renderChildren: true })
      );
    }
  }

  render() {
    const { renderChildren } = this.state;

    return renderChildren ? <Placeholder {...this.props} /> : null;
  }
}

PlaceholderAndroidWrapper.propTypes = Placeholder.propTypes;

export default PlaceholderAndroidWrapper;
