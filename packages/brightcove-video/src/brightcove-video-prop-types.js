import PropTypes from "prop-types";
import Splash from "./splash";
import Player from "./brightcove-player";

export const brightcoveVideoPropTypes = {
  directToFullscreen: PropTypes.bool,
  resetOnFinish: PropTypes.bool,
  ...Splash.propTypes,
  ...Player.propTypes
};

export const brightcoveVideoDefaultProps = Object.assign(
  {
    directToFullscreen: false,
    resetOnFinish: false
  },
  Splash.defaultProps,
  Player.defaultProps
);
