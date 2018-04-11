import PropTypes from "prop-types";
import Splash from "./splash";
import Player from "./brightcove-player";

export const brightcoveVideoPropTypes = {
  resetOnFinish: PropTypes.bool,
  directToFullscreen: PropTypes.bool,
  ...Splash.propTypes,
  ...Player.propTypes
};

export const brightcoveVideoDefaultProps = Object.assign(
  {
    resetOnFinish: false,
    directToFullscreen: false
  },
  Splash.defaultProps,
  Player.defaultProps
);
