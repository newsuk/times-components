import PropTypes from "prop-types";

const numberOrString = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

export default {
  videoId: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
  policyKey: PropTypes.string,
  playerId: PropTypes.string,
  width: numberOrString,
  height: numberOrString,
  onError: PropTypes.func,
  onChange: PropTypes.func,
  autoplay: PropTypes.bool,
  hideFullScreenButton: PropTypes.bool
};
