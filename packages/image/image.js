import React from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";
import { View, Image } from "react-native";
import merge from "lodash.merge";
import placeholder from "./placeholder";

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: this.props.height,
      width: this.props.width
    };

    this.handleLayout = this.handleLayout.bind(this);
  }

  handleLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;

    const setSize = (width, height) => {
      this.setState({
        width: containerWidth,
        height: containerWidth * height / width
      });
    };

    const { getSize } = this.props;
    const imageUri = this.props.source && this.props.source.uri;

    // the failure callback is ignored on web
    // https://github.com/necolas/react-native-web/blob/master/src/modules/ImageLoader/index.js#L25
    getSize(imageUri, setSize, () =>
      setSize(placeholder.width, placeholder.height)
    );
  }

  render() {
    const style = merge(this.props.style, {
      width: this.state.width,
      height: this.state.height
    });

    const defaultSource = {
      uri: placeholder.uri
    };

    return (
      <View onLayout={this.handleLayout}>
        <Image {...this.props} defaultSource={defaultSource} style={style} />
      </View>
    );
  }
}

ImageComponent.propTypes = {
  getSize: PropTypes.func,
  height: PropTypes.number,
  source: PropTypes.shape({
    uri: PropTypes.string.isRequired
  }).isRequired,
  style: stylePropType,
  width: PropTypes.number
};

ImageComponent.defaultProps = {
  getSize: Image.getSize,
  height: 0,
  style: {},
  width: 0
};

export default ImageComponent;
