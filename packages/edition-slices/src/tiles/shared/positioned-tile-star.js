/* eslint-disable react/require-default-props */
import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import TileStar from "./tile-star";
import { isSaveSupported } from "./utils";

import {
  starDefaultPosition,
  starCenterPosition,
  starAfterContentPosition
} from "./styles";

const PositionedTileStar = ({
  articleId,
  isAfterContentStar = false,
  isCenteredStar = false,
  isDarkStar = false,
  starStyle = {}
}) => {
  if (!isSaveSupported) return null;

  const starPositionStyles = {
    ...starDefaultPosition,
    ...(isCenteredStar && starCenterPosition),
    ...(isAfterContentStar && starAfterContentPosition)
  };

  return (
    <View style={starPositionStyles}>
      <TileStar articleId={articleId} isDark={isDarkStar} style={starStyle} />
    </View>
  );
};

PositionedTileStar.propTypes = {
  articleId: PropTypes.string.isRequired,
  isAfterContentStar: PropTypes.bool,
  isCenteredStar: PropTypes.bool,
  isDarkStar: PropTypes.bool,
  starStyle: PropTypes.shape({})
};

export default PositionedTileStar;
