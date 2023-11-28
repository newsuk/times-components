import PropTypes from "prop-types";

const numberOrString = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

export const propTypes = {
  accountId: PropTypes.string.isRequired,
  height: numberOrString.isRequired,
  id: PropTypes.string,
  is360: PropTypes.bool,
  playerId: PropTypes.string,
  policyKey: PropTypes.string.isRequired,
  poster: PropTypes.shape({ uri: PropTypes.string.isRequired }),
  videoId: PropTypes.string.isRequired,
  width: numberOrString.isRequired
};

export const defaultProps = {
  is360: false,
  playerId: "default",
  poster: null
};
