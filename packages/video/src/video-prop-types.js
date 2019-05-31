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
  paidOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  playerId: PropTypes.string,
  policyKey: PropTypes.string.isRequired,
  poster: PropTypes.shape({ uri: PropTypes.string.isRequired }),
  skySports: PropTypes.bool,
  videoId: PropTypes.string.isRequired,
  width: numberOrString.isRequired
};

export const defaultProps = {
  is360: false,
  paidOnly: false,
  playerId: "default",
  poster: null,
  skySports: false
};
