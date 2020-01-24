import React, { Component } from "react";
import { View, Image, ImageBackground } from "react-native";
import { screenWidth } from "@times-components/utils";
import PropTypes from "prop-types";

const deckUrl = id =>
  `https://gobble.timesdev.tools/deck/api/deck-post-action/${id}`;

class ResponsiveImageInteractive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: undefined
    };
  }

  componentDidMount() {
    const { deckId } = this.props;
    if (deckId) {
      this.getDeck(deckId);
    }
  }

  async getDeck(id) {
    // eslint-disable-next-line no-undef
    const res = await fetch(deckUrl(id), {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const {
      body: { data }
    } = await res.json();
    const images = data
      .filter(dat => dat.type === "image")
      .map(d => ({
        uri: d.data.Image,
        width: parseInt(d.data.Size, 10)
      }))
      .filter(d => d.width <= screenWidth())
      .sort((a, b) => a.width - b.width);
    if (images.length) {
      const image = images[images.length - 1];
      Image.getSize(image.uri, (width, height) => {
        image.height = height;
        image.aspectRatio = width / height;
        this.setState({ image });
      });
    }
  }

  render() {
    const { image } = this.state;
    if (image) {
      return (
        <ImageBackground
          source={image}
          imageStyle={{ resizeMode: "contain" }}
          style={{ width: "100%", aspectRatio: image.aspectRatio }}
        />
      );
    }
    return <View />;
  }
}

ResponsiveImageInteractive.propTypes = {
  deckId: PropTypes.number.isRequired
};

export default ResponsiveImageInteractive;
