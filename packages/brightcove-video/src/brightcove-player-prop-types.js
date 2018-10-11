import PropTypes from "prop-types";

const numberOrString = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

export default {
  accountId: PropTypes.string.isRequired,
  autoplay: PropTypes.bool,
  height: numberOrString,
  hideFullScreenButton: PropTypes.bool,
  onDuration: PropTypes.func,
  onError: PropTypes.func,
  onFinish: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onProgress: PropTypes.func,
  playerId: PropTypes.string,
  policyKey: PropTypes.string,
  videoId: PropTypes.string.isRequired,
  width: numberOrString
};
