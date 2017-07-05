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
      uri: this.props.source && this.props.source.uri,
      height: this.props.height,
      width: this.props.width
    };

    this.handleLayout = this.handleLayout.bind(this);
  }

  handleLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;

    const setSize = (uri, width, height) => {
      this.setState({
        uri,
        width: containerWidth,
        height: containerWidth * height / width
      });
    };

    const uri = this.props.source && this.props.source.uri;
    // the failure callback is ignored on web
    // https://github.com/necolas/react-native-web/blob/master/src/modules/ImageLoader/index.js#L25
    Image.getSize(uri, setSize.bind(this, uri), () =>
      setSize(placeholder.uri, placeholder.width, placeholder.height)
    );
  }

  render() {
    const style = merge(this.props.style, {
      width: this.state.width,
      height: this.state.height
    });

    return (
      <View onLayout={this.handleLayout}>
        <Image {...this.props} source={{ uri: this.state.uri }} style={style} />
      </View>
    );
  }
}

ImageComponent.propTypes = {
  height: PropTypes.number,
  source: PropTypes.shape({
    uri: PropTypes.string.isRequired
  }).isRequired,
  style: stylePropType,
  width: PropTypes.number
};

ImageComponent.defaultProps = {
  height: placeholder.width,
  style: {},
  width: placeholder.height
};

export default ImageComponent;
