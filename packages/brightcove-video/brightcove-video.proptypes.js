import PropTypes from "prop-types";

export default {
  videoId: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
  policyKey: PropTypes.string,
  playerId: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  onError: PropTypes.func,
  onChange: PropTypes.func
};
