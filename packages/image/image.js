import React from "react";
import { Image, StyleSheet, ViewPropTypes } from "react-native";
import placeholder from "./placeholder";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%"
  }
});

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: props.source
    };

    this.handleError = this.handleError.bind(this);
  }

  handleError() {
    this.setState({
      source: {
        uri: placeholder
      }
    });
  }

  render() {
    const props = Object.assign({}, this.props, this.state, {
      style: [styles.image, this.props.style]
    });

    return <Image {...props} onError={this.handleError} />;
  }
}

ImageComponent.propTypes = Object.assign({}, Image.propTypes, {
  containerStyle: ViewPropTypes.style
});

export default ImageComponent;
