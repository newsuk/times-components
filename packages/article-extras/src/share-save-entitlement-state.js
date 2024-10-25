/* eslint-env browser */
import PropTypes from "prop-types";

const ShareSaveEntitlementState = ({ shareSaveEntitlementData, children }) => {
  const FP_CODE_SHARE_AND_SAVE = "fp-753";

  const featureDecisions =
    (shareSaveEntitlementData &&
      shareSaveEntitlementData.user &&
      shareSaveEntitlementData.user.subscriptions &&
      shareSaveEntitlementData.user.subscriptions[0] &&
      shareSaveEntitlementData.user.subscriptions[0].featureDecisions) ||
    [];

  const isShareSaveEntitlementEnabled =
    featureDecisions &&
    featureDecisions.some(
      decision =>
        decision.code === FP_CODE_SHARE_AND_SAVE && decision.outcomeAsBoolean
    );

  if (
    shareSaveEntitlementData === undefined ||
    !isShareSaveEntitlementEnabled
  ) {
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

ShareSaveEntitlementState.PropTypes = PropTypes.shape({
  user: UserPropTypes.isRequired
});

export default ShareSaveEntitlementState;
