import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";

const BrightcoveVideoLauncher = ({ poster, width, height }) => <Image source={poster} style={{ width, height }}/>;

const numberOrString = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

BrightcoveVideoLauncher.propTypes = {
  videoId: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
  policyKey: PropTypes.string,
  playerId: PropTypes.string,
  width: numberOrString,
  height: numberOrString,
  onError: PropTypes.func,
  onChange: PropTypes.func,
  autoplay: PropTypes.bool,
  hideFullScreenButton: PropTypes.bool,
  poster: PropTypes.string
};

BrightcoveVideoLauncher.defaultProps = {
  width: 320,
  height: 180,
  playerId: "default",
  onError: () => {},
  onChange: () => {},
  autoplay: false,
  hideFullScreenButton: false,
  poster: "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
};

export default BrightcoveVideoLauncher;
