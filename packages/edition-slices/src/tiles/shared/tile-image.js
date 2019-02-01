import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";

const TileImage = ({ aspectRatio, style, uri }) => (
  <View style={style}>
    <Image aspectRatio={aspectRatio} uri={uri} />
  </View>
);

TileImage.propTypes = {
  aspectRatio: PropTypes.number.isRequired,
  style: PropTypes.shape({}),
  uri: PropTypes.string.isRequired
};

TileImage.defaultProps = {
  style: null
};

export default TileImage;
