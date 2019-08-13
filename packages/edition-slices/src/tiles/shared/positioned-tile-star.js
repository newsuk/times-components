/* eslint-disable react/require-default-props */
import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import TileStar from "./tile-star";
import { isSaveSupported } from "./utils";

import {
  starDefaultStyles,
  starCenterStyles,
  starUnderneathTextStyles
} from "./styles";

const PositionedTileStar = ({
  centeredStar = false,
  underneathTextStar = false,
  ...props
}) => {
  if (!isSaveSupported) return null;

  return (
    <View
      style={[
        starDefaultStyles,
        centeredStar && starCenterStyles,
        underneathTextStar && starUnderneathTextStyles
      ]}
    >
      <TileStar {...props} />
    </View>
  );
};

PositionedTileStar.propTypes = {
  articleId: PropTypes.string.isRequired,
  underneathTextStar: PropTypes.bool,
  centeredStar: PropTypes.bool,
  isDarkStar: PropTypes.bool,
  starStyle: PropTypes.shape({})
};

export default PositionedTileStar;
