import PropTypes from "prop-types";

export default {
  keyFactItem: PropTypes.object.isRequired,
  listIndex: PropTypes.number.isRequired,
  fireAnalyticsEvent: PropTypes.func.isRequired,
  intersectObserverRef: PropTypes.func.isRequired,
  analyticsData: PropTypes.object
};
