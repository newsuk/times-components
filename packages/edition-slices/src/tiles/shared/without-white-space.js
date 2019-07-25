/* eslint-disable react/require-default-props */
import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

class WithoutWhiteSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerHeight: 0,
      contentHeight: 0,
      isContentRendered: false,
      isContainerRendered: false
    };
  }

  render() {
    const {
      containerHeight,
      contentHeight,
      isContentRendered,
      isContainerRendered
    } = this.state;
    const { render, styles = {} } = this.props;
    const whiteSpaceHeight = containerHeight - contentHeight;

    return (
      <View
        style={[styles, { flex: 1 }]}
        onLayout={e =>
          !isContainerRendered &&
          this.setState({
            containerHeight: e.nativeEvent.layout.height,
            isContainerRendered: true
          })
        }
      >
        <View
          onLayout={e =>
            !isContentRendered &&
            this.setState({
              contentHeight: e.nativeEvent.layout.height,
              isContentRendered: true
            })
          }
        >
          {render(whiteSpaceHeight)}
        </View>
      </View>
    );
  }
}

export default WithoutWhiteSpace;

WithoutWhiteSpace.propTypes = {
  render: PropTypes.func.isRequired,
  styles: PropTypes.shape({})
};
