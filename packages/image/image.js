import React from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";
import { View, Image } from "react-native";
import placeholder from "./placeholder";

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: props.source,
      width: 0,
      height: 0
    };

    this.handleLayout = this.handleLayout.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;
    this.setState({
      width: containerWidth,
      height: containerWidth * this.props.aspectRatio
    });
  }

  handleError() {
    this.setState({
      source: {
        uri: placeholder
      }
    });
  }

  render() {
    const style = {
      width: this.state.width,
      height: this.state.height
    };

    return (
      <View onLayout={this.handleLayout}>
        <Image
          onError={this.handleError}
          source={this.state.source}
          style={[this.props.style, style]}
        />
      </View>
    );
  }
}

ImageComponent.propTypes = {
  aspectRatio: PropTypes.number,
  source: PropTypes.shape({
    uri: PropTypes.string.isRequired
  }).isRequired,
  style: stylePropType
};

ImageComponent.defaultProps = {
  aspectRatio: 0.75,
  style: {}
};

export default ImageComponent;
