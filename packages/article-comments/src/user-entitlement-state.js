/* eslint-env browser */
import PropTypes from "prop-types";

const UserEntitlementState = ({ userEntitlementData, children }) => {
  const FP_CODE_COMMENTING = "fp-752";

  const featureDecisions =
    (userEntitlementData &&
      userEntitlementData.user &&
      userEntitlementData.user.subscriptions &&
      userEntitlementData.user.subscriptions[0] &&
      userEntitlementData.user.subscriptions[0].featureDecisions) ||
    [];

  const isCommentingEntitlementEnabled =
    featureDecisions &&
    featureDecisions.some(
      decision =>
        decision.code === FP_CODE_COMMENTING && decision.outcomeAsBoolean
    );

  if (userEntitlementData === undefined || !isCommentingEntitlementEnabled) {
    return null;
  }

  return children;
};

const FeatureDecisionPropTypes = PropTypes.shape({
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  outcome: PropTypes.string.isRequired,
  outcomeAsBoolean: PropTypes.bool.isRequired
});

const SubscriptionPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  featureDecisions: PropTypes.arrayOf(FeatureDecisionPropTypes).isRequired
});

const UserPropTypes = PropTypes.shape({
  cpn: PropTypes.string.isRequired,
  subscriptions: PropTypes.arrayOf(SubscriptionPropTypes).isRequired
});

UserEntitlementState.PropTypes = PropTypes.shape({
  user: UserPropTypes.isRequired
});

export default UserEntitlementState;
