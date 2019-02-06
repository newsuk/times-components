import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";

const TileImage = ({ aspectRatio, borderRadius, style, uri }) => (
  <View style={style}>
    <Image aspectRatio={aspectRatio} borderRadius={borderRadius} uri={uri} />
  </View>
);

TileImage.propTypes = {
  aspectRatio: PropTypes.number.isRequired,
  borderRadius: PropTypes.number,
  style: PropTypes.shape({}),
  uri: PropTypes.string.isRequired
};

TileImage.defaultProps = {
  borderRadius: undefined,
  style: null
};

export default TileImage;
