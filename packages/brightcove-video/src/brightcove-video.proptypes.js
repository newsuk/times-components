import PropTypes from "prop-types";

const numberOrString = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

export const propTypes = {
  accountId: PropTypes.string.isRequired,
  playerId: PropTypes.string,
  videoId: PropTypes.string.isRequired,
  policyKey: PropTypes.string.isRequired,
  poster: PropTypes.shape({ uri: PropTypes.string.isRequired }),
  paidonly: PropTypes.bool,
  width: numberOrString.isRequired,
  height: numberOrString.isRequired
};

export const defaultProps = {
  paidonly: false,
  playerId: "default"
};
